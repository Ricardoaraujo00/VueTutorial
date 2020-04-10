<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{

    use VotableTrait;
    protected $fillable = ['title','body'];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function setTitleAttribute($value){
        $this->attributes['title']=$value;
        $this->attributes['slug']=str_slug($value);
    }

    public function getUrlAttribute()
    {
        return route("questions.show", $this->slug);
    }
    
    public function getCreatedDateAttribute()
    {
        return $this->created_at->diffForHumans();
    } 

    public function getStatusAttribute()
    {
        if($this->answers_count > 0) {
            if ($this->best_answer_id){
                return "answered-accepted";
            }
            return "answered";
        }
        return "unanswered";
    }

    public function getBodyHtmlAttribute()
    {
        return clean($this->bodyHtml());
    }

    public function answers()
    {
        return $this->hasMany(Answer::class)->orderBy('votes_count','DESC');
    }

    public function acceptBestAnswer(Answer $answer)
    {
        $this->best_answer_id=$answer->id;
        $this->save();
    }

    public function favorites()
    {
        return $this->belongsToMany(User::class, 'favorites')->withTimestamps();
    }

    public function isFavorited()
    {
        return $this->favorites()->where('user_id', auth()->id())->count()>0;
    }

    public function getIsFavoritedAttribute()
    {
        return $this->isFavorited();
    }

    public function getFavoritesCountAttribute()
    {
        return $this->favorites->count();
    }

    public function getExcerptAttribute($lenght)
    {
        if ($lenght !== 20){
            $lenght=250;
        }
        

        return $this->excerpt($lenght);
    }

    public function excerpt($lenght)
    {
        return str_limit(strip_tags($this->bodyHtml()),$lenght);
    }

    private function bodyHtml()
    {
        return \Parsedown::instance()->text($this->body);
    }

}
