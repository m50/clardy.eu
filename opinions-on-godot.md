
## About Godot...

So, my opinions on Godot are a bit all over the place, just like how it's built.

I overall like Godot, however it has many issues. It's got a lot of UI polish issues,
it's developers have weird priorities (in my opinion), it's Node structure encourages
inheritance over composition (more on this later), it has numerous issues
when using C# (more on that in the [C# section](#about-c#)), and it overall
has some weird workflows.

All of my issues combined does make me consider moving away from Godot, either
to Unity or to a C# game framework. I haven't done this as of yet however, as
I have a lot of sunken time and effort into the game as it is now, and I also
suspect Godot 4.0 will fix many of my issues.

## UI Polish and Workflow issues

A few examples of workflow/ui issues I have with the Godot editor are:

- The animation editor has no hotkeys, and doesn't respect ctrl-c/v at all
    so there is a lot of mouse clicking to do basic operations. There are also
    dropdowns hidden behind buttons that don't look like dropdowns, and are the
    only way to do certain operations. 
- The Tilemap editor also has a number of weird inconsistencies, but my biggest
    gripe is, again, the lack of hotkeys for it. I wouldn't mind a lot of the 
    headache involved if I could do some of the tasks with hotkeys. Instead it
    requires a lot of mouse movements to get stuff done, which makes the tedious
    even more so.
- Shader editing is near impossible to do with an outside program, so instead you
    are basically required to do it in a tiny editor window with lack of features.
- No way to copy a node with all of it's configurations between scenes, making
    the simple operation of duplicating a node between scenes a big pain.
- Hotkey's aren't context sensitive, so a hotkey can't exist for the scene tree
    and the file tree. I could be wrong about this, but it doesn't seem to be the
    case, considering Godot in general doesn't have context-aware hotkeys at all.
- Text fields are weird, and the only one that seems to follow system-wide hotkeys
    is the script editor.
- The build in Script Editor gets in the way, and really should just be a language
    server for an external editor, because it isn't anywhere near as feature
    complete as something like VSCode, but insists to butt in at all times.
- If you disable the script editor, it disables the easy way of adding and removing
    scripts from Nodes for some reason.

Aside from the first 2, which are guaranteed to be fixed in Godot 4, these are all
minor complaints, though they definitely make workflows clunky and uncomfortable.

### Priorities!!

As I mentioned, I feel the developers have some weird priorities when developing
the engine. 

For one, developing and supporting gdscript and their own built-in
text editor, as opposed to the Unity route of external-editor and a well known
language is just weird. I understand their reasonings behind it, which are
that standard, existing languages just don't match up to the feature set they
are looking for to provide better integration with the engine, however in the end,
they leave us with a feature-incomplete language that has a lot of problems with
the language itself, and a feature-incomplete editor. The focus on these means
things like the language server (in place of the editor) is filled with bugs and
inconsistencies that wouldn't exist if they focused on it over the editor, and
(as mentioned) a bug-ridden main language, and a second language that feels like
a second class citizen. It is all too often that you end up seeing the developers
mentioning the want of a feature, and explicitely saying for gdscript or gdscript/visualscript
only.

Another example of this, that I have heard quite often from those in the community,
though does not affect me at all, is the refusal to support a terrain editor for
3D, despite it being a heavily requested 3D feature.

### Inheritance over Composition... or wait, Composition over Inheritance

As I mentioned, I feel that Godot's Node structure pushes inheritance over
composition quite heavily, despite what people like to say about Godot. This is
mainly because one node cannot have multiple components/scripts, and is instead
an inherited set of building blocks. People like to say that since you have to
combine multiple nodes in a scene, this is composition over inheritance, but this
isn't the case, becauase of another key way of working in godot: Call down, signal up.
If you need 2 children nodes to interact, you need to do 1 or 3 things:

1. Have the child node get a reference to it's sibling.
    This is highly discouraged, primarily because what if they rely on each other,
    but one isn't loaded yet? Or in general, loading order matters, meaning
    that the one you are referencing may not be loaded yet, and thus breaks things.
2. Emit a signal from a child node that another node is listening to.
    This is not ideal, because you lose a lot of control over things,
    and it also requires unnecessary logic splitting. 
3. One of the nodes needs to be a child of the other node.
    This is not ideal, because what if you have 2, 3, 4 nodes all referencing the
    same sibling?

So instead, what you may need to do is put all the code for a scene in the root node
of the scene, however if you have multiple different types of objects that need
the same 2 functions that don't interact with anything else, then you either need
to inherit a base class (only possible if they are all the same root node type),
or copy the code into all the objects, creating code duplication. 

A prime example of this in my game is a script to make the sprites semi-transparent
when the player crosses an Area2D collider. For example, when the player walks
behind a tree, make the tree see-through so that the player can be seen behind it.
This same thing should also exist on buildings or large stones, or other large objects
too. 

To implement this, I have an Area2D that references a Node2D (a Sprite in this 
case), and when the Area2D encounters the player, it changes the sprite's transparency. 
Alternatively, I could make it so that the script is on the Sprite and references 
the Area2D. Or, even, I could have the Area2D be a child of the Sprite, however 
both of these come with their own problems, because what if I want the sprite to
have it's own script (for replacing the texture based on season, for example). To
do that, I'd then need to add the code to even more places. Alternatively, I can
put all this logic in the "Tree" script and in the "Building" script, etc. Or I
could put that logic into a "PlayerTransparency" base class that then "Tree" and
"Building" inherit from, but what if the "Tree" also needs to inherit from "Choppable"?
There is no multiple-inheritance in C# nor in GDScript.

Let's take a look at Unity's Component structure instead for a GameObject and see
why that actually pushes Composition over Inheritance, and how it can help solve
our issue here. Since a single GameObject can have many scripts/components, you
could add an Area2D component, and a sprite component, and a Seasonal Texture script
and a transparency script all to the same object, each affecting the object in 
their own separate ways. A composition of scripts, if you will. Unity in this case
encourages more re-usable, smaller scripts to compose a more complex object,
while the Node tree structure of Godot Scenes encourages inheritance or code
duplication, or potential bugs out of the dev's control.

## About C#...

First off, I love C#. I used it heavily back when I used Unity 8 years ago.
However it's integration into Godot does leave a lot to be desired.