@csrf
    <div class="form-group">
        <label for="question-title">Question Title</label>
        <input type="text" name="title" value="{{old('title',$question->title)}}" id="question-title" class="form-control {{$errors->has('title') ? 'is invalid' : ''}}">

        @if($errors->has('title'))
            <div class="invalid-feedbacku">
                <a><strong>{{$errors->first('title')}}</strong></a>
            </div>
        @endif
    </div>
    <div class="form-group">
        <label for="question-body">Explain your question</label>
        <textarea name="body" id="question-body" rows="10" class="form-control {{$errors->has('body') ? 'is invalid' : ''}}">{{old('body', $question->body)}}</textarea>

        @if($errors->has('body')) 
            <div class="invalid-feedbacku">
                <strong>{{$errors->first('body')}}</strong>
            </div>
        @endif
    </div>
    <div class="form-group">
    <button type="submit" class="btn btn-outline-primary btn-lg">{{$buttonText}}</button>
    </div>