import policies from './policies';


export default {
    install (Vue, options) {
        Vue.prototype.authorize = function(policy, model){
            if (! Window.Auth.signedIn) return false;
            
            if (typeof policy === 'string' && typeof model === 'object'){
                const user = Window.Auth.user;
                return policies[policy](user,model);
                
            }
        };

        Vue.prototype.signedIn=Window.Auth.signedIn;
    }
}
