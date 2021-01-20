---
title: "Making Dialogue and Navigation for NPCs in Godot"
slug: godot/2020/10/05/making-npc-system-in-godot.html
image: https://miro.medium.com/fit/c/1838/551/1*eKkwVGe7_wF14PkJiotSdg.jpeg
date: 2020-10-05
dateModified: 2021-01-19
---

# Table of Contents

* TOC
{:toc}

# Introduction

For the game I am working on (which I will create another blog post about at another
time), I needed NPCs that the player could interact with
and make the game world feel lived in and lively. These characters needed to be able
to have conversations with the player, they needed to have things that they spent
their days doing, and they needed to be able to do things on special days of the year.

The player needed to feel like the world was lived in, and that they are coming to
this place, not that this place was made for them.

So I set out to implement everything. A few of my requirements:

- Built in C# (as my whole game is in C#, not gdscript).
- Extensible for my needs.
- Easily configurable on a per-NPC basis.

# Dialogue

<div style="display: flex; justify-content: center;">
<video width="720" height="480" controls>
    <source src="{{ "/assets/videos/dialogue_window.mp4" | relative_url }}" type="video/mp4">
Your browser does not support the video tag.
</video>
</div>

While Godot has a number of dialogue systems out there, they are all built in
gdscript, so they weren't going to be usable for me. So I set out to building my
own. Many of the dialogue tools out there use JSON as the configuration format,
and often even have a fancy node-based editor for building the trees with.
This is great, but I didn't want to have to build an editor for it, and JSON just
isn't that human-friendly (not to mention, JSON doesn't have good support for multiline
strings!), so I needed a different solution.

While I did end up supporting JSON, I also decided I wanted to support YAML,
and my reasoning behind it is that it is human readable and easy enough to write
and modify that my partner, who is the artist, should be able to easily read and
write these files, without having to understand all the different symbols or
structure of JSON, just has to understand indentation.

## Data Model

I ended up using the [YamlDotNet](https://github.com/aaubry/YamlDotNet) package
for reading in the yaml files.

After I got that figured out, I created my DialogueManager and got started.
The DialogueManager class lives on a Control node and controls all of the UI
elements as well as reading and displaying the Dialogue. The DialogueManager
gets passed the path to a YAML or JSON file, and will read it in, building up the
Dialogue object:

```csharp
namespace PH.Services.DialogueSystem
{
    public struct Dialogue
    {
        public string Name { get; set; }
        public Conversation Introduction { get; set; }
        public Dictionary<string, Conversation> Conversations { get; set; }
    }

    public struct Response
    {
        public string Name { get; set; }
        public string To { get; set; }
    }

    public struct Conversation
    {
        public string Text { get; set; }
        public string To { get; set; }
        public List<Response> Responses { get; set; }
        public Dictionary<string,object> Conditions { get; set; }
        public string Animation { get; set; }

        public Conversation (string text, string to)
        {
            Text = text;
            To = to;
            Responses = null;
            Conditions = null;
            Animation = "";
        }

        public Conversation (string text)
        {
            Text = text;
            To = "";
            Responses = null;
            Conditions = null;
            Animation = "";
        }
    }
}
```

As you can see above, we have a `Dialogue` object that has a name for the NPC,
an introduction conversation, and a collection of conversations denoted by a string
identifier. Each conversation point has some Text, where it can go to afterwards or
alternatively some responses the player can give (allowing branching), some conditions
for why the dialogue should appear (such as day, time, special events, etc.),
and animation to play on the character. Now, the animation to play is likely to change
when we implement character portraits, as we made the decision after this was built
that we were going to end up doing that.

And here is what that data object translates to, YAML wise:

```yaml
name: Jo
introduction:
  text: |
    Hello!
    Here are some tools to get you started!

    [item path=Tools/Hoe.tscn]Jo gave you a Hoe![/item]
    [item path=Tools/Sickle.tscn]Jo gave you a Sickle![/item]
    [item path=Tools/WateringCan.tscn]Jo gave you a Watering Can![/item]
    [item path=Tools/Axe.tscn]Jo gave you an Axe![/item]
  responses:
    - name: Cool!
      to: intro-continue
    - name: Bye!
      to: close
conversations:
  intro-continue:
    conditions:
      default: true
    text: |
      You have a lot of farming to do! Here, take these!

      [item path=Seeds/CarrotSeeds.tscn count=20]Added 20 Carrot Seeds![/item]
      [item path=Seeds/PumpkinSeeds.tscn count=20]Added 20 Pumpkin Seeds![/item]
      [item path=Seeds/MandrakeSeeds.tscn count=20]Added 20 Mandrake Seeds![/item]
    to: close
  special-rainbow:
    text: This is a [rainbow]special[/rainbow] dialog!
    to: close
    conditions:
      relationshipLevel: 2
      season: Spring
  sprint-generic:
    text: I don't know who you are, but I have a good feeling about you!
    to: sprint-generic-2
    conditions:
      relationshipLevel: 0
      season: Spring
  spring-generic-2:
    text: |
      I wish you the best in everything.

      [item path=Seeds/CarrotSeeds.tscn count=5]Added 5 Carrot Seeds![/item]
      [item path=Seeds/PumpkinSeeds.tscn count=5]Added 5 Pumpkin Seeds![/item]
      [item path=Seeds/MandrakeSeeds.tscn count=5]Added 5 Mandrake Seeds![/item]
    to: close
```

Now, there is a lot more going on there, specifically related to
items, that we will get to later. Aside from that, you can see just how easy it is
to build and write dialogue. You have support for multi-line text, BBCode, branching
and conditions. It's worth mentioning that `to: close`. Close isn't a dialogue point,
but instead it tells the system that the character is done talking to the player.

## Rendering Dialogue

Now that we can read the YAML file and build out dialogue, how do we display it?
Well, on interact with the NPC (or whatever it is that has dialogue), the following
is called:

```csharp
_dialogueManager.Read(dialoguePath)
    .SetAnimationTree(_animationTree)
    .FindConversation(_state.RelationshipLevel)
    .ShowIntroduction(!_state.Introduced)
    .Render();
```

This call chain should be relatively straightforward. The dialogue manager is told
to read a dialogue from a specified path and load it up, the animation tree (to play
animations) is set, a conversation is search for (ignore the RelationshipLevel for now),
which may be replaced if we have not been introduced yet, and then rendered.

For finding a conversation, we essentially just loop through all of the conversations
in the dialogue, and check to see if they match the conditions, if so, we store that.
Rendering is where it gets most interesting, here we load the text into a
[RichTextLabel]'s BbcodeText property, build out the buttons that should exist
in the responses list, and then display the dialogue window.

```csharp
foreach (Control child in _actionsContainer.GetChildren())
    child.QueueFree();
if (_conversation.Responses?.Count > 0)
{
    foreach (var response in _conversation.Responses)
    {
        var nextBtn = new Button();
        nextBtn.Text = response.Name;
        nextBtn.Connect("pressed", this, "_OnActionPressed", new string[] { response.To });
        _actionsContainer.AddChild(nextBtn);
    }
}
else if (_conversation.To != null && _conversation.To != "")
{
    var nextBtn = new Button();
    nextBtn.Text = "...";
    if (_conversation.To == "close")
        nextBtn.Text = "Bye!";
    nextBtn.Connect("pressed", this, "_OnActionPressed", new string[] { _conversation.To });
    _actionsContainer.AddChild(nextBtn);
}
else throw new System.Exception("Missing responses and to in dialogue");
```

In here, you can see that if we have responses, that we create buttons and add
it to our _actionsContainer, otherwise, we check that we have a to, and create
an action based on that. If neither exist, we throw an exception, which would
hopefully be caught in testing.

One other important thing to note, however, is I also set the RichTextLabel's
VisibleCharacters property to 0, so that it can start writing out the text.

## Gibberish Chatter

For writing out text, I didn't want it to be dead silent, nor did I want to have
to record all the text in the game, so I made a system similar to Animal Crossing,
to allow gibberish-sounding speach to come out. When I decided to do it this way,
I remembered a YouTube video I saw about it by [Blipsounds]. I recorded myself
speaking every letter of the alphabet, as well as the numbers 0-9, sped them up
2.5x, and then split them each into their own audio file, named their letter.
In the DialogueManager, I loaded in all the files into a dictionary with their
character as the key, and the sound file as their value.

```csharp
var chars = new string[] {
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
};

characterSounds = new Dictionary<string, AudioStream>();
foreach (var ch in chars)
    characterSounds[ch] = ResourceLoader.Load<AudioStream>($"res://Assets/Audio/Dialog/{ch}.ogg");
```

I also created a queue of audio players, with a large number of audio players,
so that they can play slightly over each other, without things being cut off, or
just not playing at all.

```csharp
_audioPlayers = new Queue<AudioStreamPlayer>();
for (var i = 0; i < textSpeed / 2; i++)
{
    var player = new AudioStreamPlayer();
    AddChild(player);
    player.Connect("finished", this, nameof(_OnStreamFinished), new AudioStreamPlayer[] { player });
    player.Bus = AudioManager.DIALOG_BUS;
    _audioPlayers.Enqueue(player);
}

// ...
private void _OnStreamFinished(AudioStreamPlayer streamPlayer) =>
    _audioPlayers.Enqueue(streamPlayer);
```

Then in the `_Process` command, we start revealing characters, and when a new
character appears, play it's audio byte.

```csharp
public override void _Process(float delta)
{
    // If we have no text to display, then exit early.
    if (_text.VisibleCharacters >= _text.Text.Length) return;

    // Get what the visible characters is at prior to adjusting it, so we can
    //  guarantee we don't make too many sounds.
    var before = _text.VisibleCharacters;
    // _displayAmount is a float so that we don't show hundreds of characters in a second
    _displayAmount += delta * textSpeed;
    // And then round it to an Int, to see where are at.
    _text.VisibleCharacters = Mathf.RoundToInt(_displayAmount);

    // Return early if we should not make any sounds
    if (_text.VisibleCharacters <= 0 || before >= _text.VisibleCharacters) return;

    // Get the latest visible character and play that sound.
    var curChar = _text.Text[_text.VisibleCharacters - 1].ToString();
    if (characterSounds.ContainsKey(curChar) && _audioPlayers.Count > 0)
    {
        var audio = _audioPlayers.Dequeue();
        audio.Stream = characterSounds[curChar];
        audio.Play();
    }
}
```

Then, I just made it so that if you click on the dialogue window, it fills
in all the text, and that's really all that remains.

There is still a lot of code I didn't show, but this should give you an idea
of how to approach this, and aside from YAML, pretty much all of this should
be achievable in gdscript as well.

## Adding items

The last thing worth mentioning are those `[item]` bbcode statements.
These allow me to add items to the player by just having it in the text that the
character speaks.

```csharp
namespace PH.Services.DialogueSystem.BBCode
{
    [Tool, ClassName]
    public class AddItem : RichTextEffect
    {
        public string bbcode { get => "item"; }

        [Signal] public delegate void Appeared(string itemPath, int count);

        private Dictionary<string, bool> _added = new Dictionary<string, bool>();

        public override bool _ProcessCustomFx(CharFXTransform charFx)
        {
            charFx.Color = new Color(0, 1, 1, 1);
            charFx.Offset = new Vector2(10, 0);
            // Get<T>() is an extension method I made, because Godot is missing so
            //  many generic methods.
            // This allows us to stick a random (non letter) character in, and just hide it,
            //  instead of displaying some blue text.
            charFx.Visible = charFx.Env.Get<bool>("v", true);
            // All items are in subfolders of this root folder, so let's hard hardcode
            //  the first part of this path, to allow shorter paths in the dialogue.
            var itemPath = "res://Scenes/GameObjects/Items/" + charFx.Env.Get<string>("path", "");
            var count = Mathf.RoundToInt(charFx.Env.Get<float>("count", 0));
            var key = $"{itemPath}:{count}";
            if (!_added.ContainsKey(key) || !_added[key])
                EmitSignal(nameof(Appeared), itemPath, count);

            return true;
        }

        public void OnAppeared(string itemPath, int count, SceneTree tree)
        {
            _added.Add($"{itemPath}:{count}", true);
            var itemScene = ResourceLoader.Load<PackedScene>(itemPath);
            if (itemScene == null) {
                return;
            }
            var item = itemScene.Instance<Item>();
            tree.Root.GetNode<UI>(UI.ROOT_PATH).Inventory.AddItemToNextSlot(item, (uint)count);
        }

        public void OnHide() => _added = new Dictionary<string, bool>();
    }
}
```

Two important things to note right off the bat:

1. The use of the `Tool` Attribute. According to the [RichTextLabel] documentation,
    `RichTextEffect`s need to be marked as Tools.
2. The `ClassName` attribute. This is [my class_name C# plugin](https://github.com/m50/Godot-CSharp-Node-Exports)
    in action, allowing the exporting of custom resources.

Aside from that, I had to create a public variable called `bbcode` (HAS to be all lowercase),
that allows me to declare what the bbcode text is, and then I use signals combined with
some internal functions to have an effect. Since resources have no access to the scene,
you have to pass the scene into them. To do this here, I pass it in via a signal, which
is connected through a simple script on the RichTextLabel.

```csharp
namespace PH.Services.DialogueSystem
{
    public class BBText : RichTextLabel
    {
        public override void _EnterTree()
        {
            foreach (RichTextEffect effect in CustomEffects)
            {
                if (effect.HasSignal("Appeared") && effect.HasMethod("OnAppeared"))
                    effect.Connect("Appeared", effect, "OnAppeared", new SceneTree[] { GetTree() });
                if (effect.HasMethod("OnHide"))
                    Connect("hide", effect, "OnHide");
            }
        }
    }
}
```

It is pretty straight forward, for each custom effect, connect the signals as needed.


# Schedules

> !! No video for this one, not much to show, sorry! !!

Schedules are an interesting thing. They require that you have some sort of time
system in your game. In mine, I have a time manager which stores the second, minute,
hour, day, and season (month) of the game. Then seconds are counted using `_Process`,
and when seconds hit 60, it counds up a minute, and when that hits 60, it counds up
an hour, etc. It's a pretty straightforward and simple time system. One important
thing to note is that anytime the minutes and hours change, signals are emitted.
Those signals are tied into the NPC for scheduling purposes.

```csharp
// These are some autowire attributes I created.
// https://github.com/m50/Godot-CSharp-Autowire
[Connect(TimeManager.ROOT_PATH, nameof(TimeManager.MinuteChanged))]
[Connect(TimeManager.ROOT_PATH, nameof(TimeManager.HourChanged))]
private void _OnTimeChanged(uint by)
{
    var curEvent = _scheduler.GetCurrentEvent(
        _timeManager.Hours, _timeManager.Minutes,
        _timeManager.Day, _timeManager.Season
    );
    if (curEvent != _CurEvent)
        _CurEvent = curEvent;
}
```

As we can see, anytime the time changes, we get the current event from our scheduler
instance, and then if the current event is different, we set a new current event.
`_CurEvent` is a property that kicks off new navigation.

```csharp
private Scheduler.Event _CurEvent
{
    get => _curEvent;
    set
    {
        _curEvent = value;
        _navigator.NavigateTo(_curEvent.Scene, _curEvent.PointOfInterest);
    }
}
```

Now, I won't go into the relatively complex data model for the scheduler, but
I will just give a small snippet of the schedule:

```yaml
spring:
  monday:
    - from: 10
      to:
        hour: 16
        minute: 30
      pointOfInterest: Cottage
      scene: TestWorld
      facing:
        "x": 0
        "y": 1
# ...
specialEvents:
  - day: 2
    season: Spring
    events:
      - from: 6
        to: 18
        pointOfInterest: SouthShore
        scene: TestWorld2
        facing:
          "x": 0
          "y": -1
```

As you can see here, the data model is broken up into 5 categories, the 4 seasons
and specialEvents. The 4 seasons are broken up into the days of the weeks, and then a
schedule is provided for the days, as an array of objects, containg the from and to
time, and where and what direction they should be standing. From/to can take just a
number to set the hour, or can take an object of hour and minute. This is handled with a custom
cast on my timestamp object. Special events are stored as an array of objects, containg a
day and season of the special event, and what their schedule (the events) is for that day.
This allows me to have characters run to special locations on their birthday, anniversary,
or holiday for example.

The `pointOfInterest` is a node path from a root `PointsOfInterest` Node2D object,
in the specified `scene`. This allows me to place a bunch of Position2Ds in a scene
and name them special names to make it easy enough to find them. My GameManager script
handles returning `Level` objects, which are what I am calling `scene` here.

To get the current event, as seen earlier, it's pretty straight forward:

```csharp
public Event GetCurrentEvent(uint hour, uint minute, uint day, TimeManager.Seasons season)
{
    var events = _schedule.GetSpecialEvent(day, season);
    if (events == null)
        events = _schedule.GetSeason(season).GetDayOfWeek((int)day);

    return events.FirstOrDefault((e) => e.Contains(new TimeStamp(hour, minute)));
}
```

First, I ask the schedule to find a special event for the day/season that we are in,
else finds the events for the day of the week for the season we are in,
then we get the first event that contains the specified hour/minute. One important
point of the contains is that time wrapping exists, so we need to account for `from`
and `to` wrapping over the 24hr barrier.

```csharp
public bool Contains(TimeStamp timeslot)
{
    var pastFrom = From.Hour <= timeslot.Hour && (From.Minute <= timeslot.Minute || From.Minute == 0);
    var beforeTo = To.Hour > timeslot.Hour && (To.Minute > timeslot.Minute || To.Minute == 0);
    if (From.Hour > To.Hour && timeslot.Hour < 24)
        beforeTo = true;
    else if (From.Hour > To.Hour && timeslot.Hour >= 0)
        pastFrom = true;

    return pastFrom && beforeTo;
}
```

There isn't anything more to it, outside of the extensive data model. The structs each
contain some helper functions and comparison tools and what not, to make working
with the data model easier. Here is a screenshot of the data model folded up, to
give a bit of an overview of all the components:


<div style="display: flex; justify-content: center;">
    <img width="500" src="{{ "/assets/images/schedule_datamodel.png" | relative_url }}"
        alt="Schedule Datamodel screenshot, containing: TimeStamp, Event, Season, SpecialEvent, Schedule">
</div>

# Navigation

As seen earlier, we have a navigator class, which handles all the navigation
(using Navigation2D nodes from Godot) for the character. Once we have a pointOfInterest,
the Navigator class looks it up, and builds a path.

```csharp
public void NavigateTo(string scene, string pointOfInterest)
{
    // Return early if we don't know where we are going.
    if (scene == "" || pointOfInterest == "" || scene == null || pointOfInterest == null) return;
    var destScene = _gameManager.GetScene(scene);
    var poi = destScene.PointsOfInterest[pointOfInterest];
    // If we have a path already, let's clear it. There was likely a time jump.
    _navPoints.Clear();
    // If the NPC's destination is not in it's current scene:
    if (NPC.CurrentScene.Name != scene)
    {
        // Find the doorway to the scene we need to go to
        var doorway = NPC.CurrentScene.FindDoorwayTo(scene);
        // and find the point to be able to travel.
        var doorwayPoint = doorway.GetNode<CollisionShape2D>("CollisionShape2D");
        // Get the path.
        var points = NPC.CurrentScene.Navigation2D
            .GetSimplePath(NPC.Position, doorwayPoint.Position + doorway.Position);
        foreach (var point in points)
            _navPoints.Enqueue(point);
        // After we get the path to the scene switcher, we get the path to our
        //  point of interest.
        points = _gameManager.GetScene(scene).Navigation2D
            .GetSimplePath(doorway.positionInNewScene, poi.Position);
        foreach (var point in points)
            _navPoints.Enqueue(point);
    }
    // Else, it's destination is in it's current scene, so this is pretty simple,
    //  get the path, and queue up the points.
    else
    {
        var points = new Queue<Vector2>(NPC.CurrentScene.Navigation2D
            .GetSimplePath(NPC.Position, poi.Position));
        foreach (var point in points)
            _navPoints.Enqueue(point);
    }
}
```

One thing I got caught on, so I will make a point to mention it here, all the
destination points need to be relative to the Navigation2D. In this case, the
YSort that the NPC belongs to, the Navigation2D, and the doorway are all relative
to the same root node: the scene, so we need to make sure all our positions are relative
to that. This is why there is no use of GlobalPosition. I generally work in GlobalPosition,
as it is more accurate, but it actually breaks things with Navigation2D! If you
know how to get Navigation2D to work in GlobalPosition, please let me know on twitter!

Once we have a path, we need to actually walk to it! This is handled in the `_Process`
method. Here, we get the next point we are traveling to, and if we aren't currently
traveling to a point, we move into a MoveTo state, which moves our character to that point.

```csharp
public override void _Process(float delta)
{
    if (_navPoints.Count == 0) return;

    var nextPoint = Vector2.Zero;
    try { nextPoint = _navPoints.Peek(); }
    catch { }

    if (nextPoint == Vector2.Zero)
        NPC.StateMachine.Travel(nameof(Idle));
    else if (!_currentlyTraveling)
    {
        GD.Print("Moving to ", nextPoint,
            " with offset ", NPC.CurrentScene.GlobalPosition,
            " equating to ", nextPoint + NPC.CurrentScene.GlobalPosition);
        nextPoint += NPC.CurrentScene.GlobalPosition;
        _currentlyTraveling = true;
        NPC.StateMachine.Travel(nameof(MoveTo));
        var moveToState = (NPC.StateMachine.CurrentState as MoveTo);
        moveToState.MovePoint = nextPoint;
        FacingDir = NPC.GlobalPosition.DirectionTo(nextPoint);
    }
}
```

Then, once the character arrives, we turn it to face the direction outlined in
it's schedule. There is also support here for playing an animation, however this
will likely change to specifying a state (such as `Fishing` for example) that
makes the NPC use a specific codified state, rather than just an animation state.

# Conclusion

That is all there really is to the implementation. I skimmed over quite a bit,
as this was already quite long as is, and skipped over huge chunks of the code.
Most of it should be pretty easy to fill in the gaps of. This was mostly meant to
be an outline, rather than a step-by-step tutorial (if it were that, I'd probably
have broken this up into multiple articles, because wow, this is long!). It's important
to re-iterate that if you are a gdscript developer, all of this is possible there
as well, the key differences being that you won't be able to pre-define a data
model like I did, and instead everything existing in a dictionary, and you will
be required to use JSON rather than YAML (though, there is a [yaml plugin],
so if you can build the C++ code for it, you should be good to go).

Keep an eye out for my blog post actually discussing my game, as well as future
posts about other cool things I build for the game.

And if you read to here, you deserve a cookie! 🍪

[RichTextLabel]: https://docs.godotengine.org/en/stable/tutorials/gui/bbcode_in_richtextlabel.html
[Blipsounds]: https://www.youtube.com/watch?v=4W57Wy6veUM&feature=emb_logo
[yaml plugin]: https://github.com/Beliaar/godot-yaml
