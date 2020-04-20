<answer-edit :answer="{{$answer}}" inline-template>
    <div class="media post">
        @include('shared._vote',[
            'model'=>$answer
        ])
        <div class="media-body">
            <form v-show="editing" @submit.prevent="update" >
                <div  class="form-group">
                    <textarea rows="10" v-model="body" class="form-control" required></textarea>
                </div>
                <button class="btn btn-outline-primary" :disabled="isInvalid">Update</button>
                <button class="btn btn-outline-secondary" @click="cancel" type="button">Cancel</button>
            </form>
            
            <div v-show="!editing">
                <div v-html="bodyHtml"></div>
                <div class="row">
                    <div class="col-4">
                        <div class="ml-auto">
                            @can('update',$answer)
                                <a @click.prevent="edit" class="btn btn-outline-info">Edit</a>
                            @endcan
                            @can('delete',$answer)
                                <form class="form-delete" method="post" action="{{route('questions.answers.destroy', [$question->id, $answer->id])}}">
                                    @method('DELETE')
                                    @csrf
                                    <button type="submit" class="btn btn-sm btn-outline-danger" onclick="return confirm('Are you sure?')">Delete</button>
                                </form>
                            @endcan
                        </div>
                    </div>
                    <div class="col-4">
                    </div>
                    <div class="col-4">
                        <user-info :model="{{ $answer }}" label="Asked"></user-info>
                    </div>
                </div>
            </div>
        </div>
    </div>
</answer-edit>