<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Traits\Macroable;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Contracts\Support\Arrayable;

/**
 * GitData
 * Stores the Count data from the GitApi countables.
 * 
 * @method void __construct(Collection $data, Carbon $earliest_date = null, Carbon $latest_date = null)
 * @method self merge(GitData $gd)
 * @method array implode()
 * @method array toArray()
 * @method string toJson()
 * @method mixed __get()
 * @static string determineHeatmapColour($count)
 */
class GitData implements Arrayable, Jsonable
{
    use Macroable;

    /**
     * The data store for the countables.
     *
     * @var Illuminate\Support\Collection
     */
    protected $data;

    /**
     * The earliest date that the GitData goes to.
     *
     * @var Carbon\Carbon
     */
    protected $earliest_date;

    /**
     * The latest date that the GitData goes to.
     *
     * @var Carbon\Carbon
     */
    protected $latest_date;

    /**
     * Construct a new GitData instance.
     *
     * @param Illuminate\Support\Collection $data
     * @param Carbon\Carbon|null $earliest_date
     * @param Carbon\Carbon|null $latest_date
     * @return void
     */
    public function __construct(Collection $data, Carbon $earliest_date = null, Carbon $latest_date = null)
    {
        $this->data = $data;
        $this->latest_date = $latest_date ?? now();
        $this->earliest_date = $earliest_date ?? now()->subMonths(12);
    }

    /**
     * Merges another GitData set into this one.
     *
     * @param GitData $gd
     * @return self
     */
    public function merge(GitData $gd): self
    {
        $events = collect();
        for ($day = 1; $day <= 7; $day++) {
            $k = collect();
            foreach ($this->data[$day] as $date => $obj) {
                if (isset($gd->data[$day][$date])) {
                    $obj['count'] += $gd->data[$day][$date]['count'];
                }
                $k[$date] = $obj;
            }
            foreach ($gd->data[$day] as $date => $obj) {
                if (isset($k[$date])) {
                    continue;
                }
                $k[$date] = $obj;
            }

            $events[$day] = $k;
        }
        $this->data = $events;
        if ($gd->earliest_date->lt($this->earliest_date)) {
            $this->earliest_date = $gd->earliest_date;
        }
        if ($gd->latest_date->gt($this->latest_date)) {
            $this->latest_date = $gd->latest_date;
        }
        return $this;
    }

    /**
     * Alias for toArray();
     *
     * @return array
     */
    public function implode(): array
    {
        return $this->toArray();
    }

    /**
     * Convert the object to its JSON representation.
     *
     * @param  int  $options
     * @return string
     */
    public function toJson($options = 0)
    {
        return json_encode($this->toArray(), $options);
    }

    /**
     * Get the instance as an array.
     *
     * @return array
     */
    public function toArray()
    {
        return [
            'data' => $this->data,
            'earliest_date' => $this->earliest_date,
            'latest_date' => $this->latest_date
        ];
    }

    /**
     * Accessor for the data.
     *
     * @param mixed $name
     * @return mixed
     */
    public function __get($name)
    {
        return $this->$name;
    }

    /**
     * Determine colour class based on the count.
     *
     * @param int $count
     * @return string
     */
    public static function determineHeatmapColour($count): string
    {
        $heatmapClass = config('contrib-calendar.heatmap-class.zero', 'bg-gray-300');
        if ($count >= 1 && $count < 9) {
            $heatmapClass = config('contrib-calendar.heatmap-class.low', 'bg-blue-200');
        } elseif ($count >= 10 && $count < 19) {
            $heatmapClass = config('contrib-calendar.heatmap-class.medium', 'bg-blue-400');
        } elseif ($count >= 20 && $count < 29) {
            $heatmapClass = config('contrib-calendar.heatmap-class.high', 'bg-blue-600');
        } elseif ($count >= 30) {
            $heatmapClass = config('contrib-calendar.heatmap-class.very-high', 'bg-blue-800');
        }
        return $heatmapClass;
    }
}