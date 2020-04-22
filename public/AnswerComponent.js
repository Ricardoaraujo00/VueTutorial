(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["AnswerComponent"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Accept.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Accept.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _event_bus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../event-bus */ "./resources/js/event-bus.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['answer'],
  data: function data() {
    return {
      isBest: this.answer.is_best,
      id: this.answer.id
    };
  },
  created: function created() {
    var _this = this;

    _event_bus__WEBPACK_IMPORTED_MODULE_0__["default"].$on('accepted', function (id) {
      _this.isBest = id === _this.id;
    });
  },
  methods: {
    create: function create() {
      var _this2 = this;

      axios.post("/answers/".concat(this.id, "/accept")).then(function (res) {
        _this2.$toast.success(res.data.message, "Success", {
          timeout: 3000,
          position: 'bottomLeft'
        });

        _this2.isBest = true;
        _event_bus__WEBPACK_IMPORTED_MODULE_0__["default"].$emit('accepted', _this2.id);
      });
    }
  },
  computed: {
    canAccept: function canAccept() {
      return this.authorize('accept', this.answer);
    },
    accepted: function accepted() {
      return !this.canAccept && this.isBest;
    },
    classes: function classes() {
      return ['mt-2', this.isBest ? 'vote-accepted' : ''];
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Answer.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Answer.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Vote_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vote.vue */ "./resources/js/components/Vote.vue");
/* harmony import */ var _UserInfo_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserInfo.vue */ "./resources/js/components/UserInfo.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['answer'],
  components: {
    Vote: _Vote_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    UserInfo: _UserInfo_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      editing: false,
      body: this.answer.body,
      bodyHtml: this.answer.body_html,
      id: this.answer.id,
      questionId: this.answer.question_id,
      beforeEditCache: null
    };
  },
  methods: {
    edit: function edit() {
      this.beforeEditCache = this.body;
      this.editing = true;
    },
    cancel: function cancel() {
      this.body = this.beforeEditCache;
      this.editing = false;
    },
    update: function update() {
      var _this = this;

      axios.patch(this.endpoint, {
        body: this.body
      }).then(function (res) {
        //console.log(res);
        _this.editing = false;
        _this.bodyHtml = res.data.body_html;

        _this.$toast.success(res.data.message, 'Success', {
          timeout: 3000
        });
      })["catch"](function (err) {
        _this.$toast.error(err.response.data.message, 'Error', {
          timeout: 3000
        });
      });
    },
    destroy: function destroy() {
      var _this2 = this;

      this.$toast.question('Are you sure about that?', "confirm", {
        timeout: 20000,
        close: false,
        overlay: true,
        displayMode: 'once',
        id: 'question',
        zindex: 999,
        title: 'Hey',
        position: 'center',
        buttons: [['<button><b>YES</b></button>', function (instance, toast) {
          axios["delete"](_this2.endpoint).then(function (res) {
            // $(this.$el).fadeOut(500, () => {
            //     this.$toast.success(res.data.message, 'Success', {timeout:3000});
            // })
            _this2.$emit('deleted');
          });
          _this2.count -= 1;
          instance.hide({
            transitionOut: 'fadeOut'
          }, toast, 'button');
        }, true], ['<button>NO</button>', function (instance, toast) {
          instance.hide({
            transitionOut: 'fadeOut'
          }, toast, 'button');
        }]]
      });
    }
  },
  computed: {
    isInvalid: function isInvalid() {
      return this.body.length < 10;
    },
    endpoint: function endpoint() {
      return "/questions/".concat(this.questionId, "/answers/").concat(this.id);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Answers.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Answers.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Answer_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Answer.vue */ "./resources/js/components/Answer.vue");
/* harmony import */ var _NewAnswer_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewAnswer.vue */ "./resources/js/components/NewAnswer.vue");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (_defineProperty({
  props: ['question'],
  components: {
    Answer: _Answer_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    NewAnswer: _NewAnswer_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      questionId: this.question.id,
      count: this.question.answers_count,
      answers: [],
      nextUrl: null
    };
  },
  created: function created() {
    this.fetch("/questions/".concat(this.questionId, "/answers"));
  },
  methods: {
    add: function add(answer) {
      this.answers.push(answer);
      this.count++;
    },
    remove: function remove(index) {
      this.answers.splice(index, 1);
      this.count--;
    },
    fetch: function fetch(endpoint) {
      var _this = this;

      axios.get(endpoint, {
        useCredentails: true
      }).then(function (_ref) {
        var _this$answers;

        var data = _ref.data;

        (_this$answers = _this.answers).push.apply(_this$answers, _toConsumableArray(data.data));

        _this.nextUrl = data.next_page_url;
      });
    }
  },
  computed: {
    title: function title() {
      return this.count + " " + (this.count > 1 ? 'Answers' : 'Answer');
    }
  }
}, "components", {
  Answer: _Answer_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  NewAnswer: _NewAnswer_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Favorite.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Favorite.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['question'],
  data: function data() {
    return {
      isFavorited: this.question.is_favorited,
      count: this.question.favorites_count,
      id: this.question.id,
      requesting: false
    };
  },
  computed: {
    classes: function classes() {
      return ['favorite', 'mt-2', !this.signedIn ? 'off' : this.isFavorited ? 'favorited' : ''];
    },
    endpoint: function endpoint() {
      return "/questions/".concat(this.id, "/favorites");
    }
  },
  methods: {
    toggle: function toggle() {
      if (!this.signedIn) {
        this.$toast.warning("Please login to favorite the question", "Warning", {
          timeout: 3000,
          position: 'bottomLeft'
        });
        return;
      }

      if (this.requesting == false) {
        this.requesting = true;
        this.isFavorited ? this.destroy() : this.create();
      }
    },
    destroy: function destroy() {
      var _this = this;

      axios["delete"](this.endpoint).then(function (res) {
        _this.count--;
        _this.isFavorited = false;
        _this.requesting = false;
      });
    },
    create: function create() {
      var _this2 = this;

      axios.post(this.endpoint).then(function (res) {
        _this2.count++;
        _this2.isFavorited = true;
        _this2.requesting = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/NewAnswer.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/NewAnswer.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['questionId'],
  methods: {
    create: function create() {
      var _this = this;

      axios.post("/questions/".concat(this.questionId, "/answers"), {
        body: this.body
      })["catch"](function (error) {
        _this.$toast.error(error.response.data.message, "Error");
      }).then(function (_ref) {
        var data = _ref.data;

        _this.$toast.success(data.message, "Success");

        _this.body = '';

        _this.$emit('created', data.answer);
      });
    }
  },
  data: function data() {
    return {
      body: ''
    };
  },
  computed: {
    isInvalid: function isInvalid() {
      return !this.signedIn || this.body.length < 10;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Question.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Question.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Vote_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vote.vue */ "./resources/js/components/Vote.vue");
/* harmony import */ var _UserInfo_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserInfo.vue */ "./resources/js/components/UserInfo.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['question'],
  components: {
    Vote: _Vote_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    UserInfo: _UserInfo_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      title: this.question.title,
      body: this.question.body,
      bodyHtml: this.question.body_html,
      editing: false,
      id: this.question.id,
      beforeEditCache: {}
    };
  },
  computed: {
    isInvalid: function isInvalid() {
      return this.body.length < 10 || this.title.lenfgth < 10;
    },
    endpoint: function endpoint() {
      return "/questions/".concat(this.id);
    }
  },
  methods: {
    edit: function edit() {
      this.beforeEditCache = {
        body: this.body,
        title: this.title
      };
      this.editing = true;
    },
    cancel: function cancel() {
      this.body = this.beforeEditCache.body;
      this.title = this.beforeEditCache.title;
      this.editing = false;
    },
    update: function update() {
      var _this = this;

      axios.put(this.endpoint, {
        body: this.body,
        title: this.title
      })["catch"](function (_ref) {
        var response = _ref.response;

        _this.$toast.error(response.data.message, 'Error', {
          timeout: 3000
        });
      }).then(function (_ref2) {
        var data = _ref2.data;
        _this.bodyHtml = data.body_html;

        _this.$toast.success(data.message, 'Success', {
          timeout: 3000
        });

        _this.editing = false;
      });
    },
    destroy: function destroy() {
      var _this2 = this;

      this.$toast.question('Are you sure about that?', "confirm", {
        timeout: 20000,
        close: false,
        overlay: true,
        displayMode: 'once',
        id: 'question',
        zindex: 999,
        title: 'Hey',
        position: 'center',
        buttons: [['<button><b>YES</b></button>', function (instance, toast) {
          axios["delete"](_this2.endpoint).then(function (res) {
            _this2.$toast.success(res.data.message, 'Success', {
              timeout: 3000
            });
          });
          setTimeout(function () {
            window.location.href = "/questions/";
          }, 1000);
          instance.hide({
            transitionOut: 'fadeOut'
          }, toast, 'button');
        }, true], ['<button>NO</button>', function (instance, toast) {
          instance.hide({
            transitionOut: 'fadeOut'
          }, toast, 'button');
        }]]
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UserInfo.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/UserInfo.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['model', 'label'],
  computed: {
    postDate: function postDate() {
      console.log(this.label, this.model.created_date);
      return this.label + " " + this.model.created_date;
    }
  },
  data: function data() {
    return {
      user: this.model.user
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Vote.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Vote.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Favorite_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Favorite.vue */ "./resources/js/components/Favorite.vue");
/* harmony import */ var _Accept_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Accept.vue */ "./resources/js/components/Accept.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//Vue.component('favorite', () => import(/* webpackChunkName: "AnswerComponent" */ './components/Favorite.vue'));
//Vue.component('accept', () => import(/* webpackChunkName: "AnswerComponent" */ './components/Accept.vue'));


/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['name', 'model'],
  computed: {
    classes: function classes() {
      return this.signedIn ? '' : 'off';
    },
    endpoint: function endpoint() {
      return "/".concat(this.name, "s/").concat(this.id, "/vote");
    }
  },
  components: {
    // Favorite: Favorite,
    // Accept: Accept
    Favorite: _Favorite_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    Accept: _Accept_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      count: this.model.votes_count || 0,
      id: this.model.id,
      voteUpAllow: true,
      voteDownAllow: true,
      callInProgress: false,
      initialCount: this.model.votes_count
    };
  },
  methods: {
    title: function title(voteType) {
      var titles = {
        up: "This ".concat(this.name, " is usefull"),
        down: "This ".concat(this.name, " is not usefull")
      };
      return titles[voteType];
    },
    voteUp: function voteUp() {
      if (this.voteUpAllow && !this.callInProgress) {
        this._vote(1);

        this.voteUpAllow = false;
        this.voteDownAllow = true;
        this.callInProgress = true;
      }
    },
    voteDown: function voteDown() {
      if (this.voteDownAllow && !this.callInProgress) {
        this._vote(-1);

        this.voteDownAllow = false;
        this.voteUpAllow = true;
        this.callInProgress = true;
      }
    },
    _vote: function _vote(vote) {
      var _this = this;

      if (!this.signedIn) {
        this.$toast.warning("Please login to vote the ".concat(this.name), "Warning", {
          timeout: 3000,
          position: 'bottomLeft'
        });
        this.callInProgress = false;
        return;
      }

      axios.post(this.endpoint, {
        vote: vote
      }).then(function (res) {
        _this.$toast.success(res.data.message, "Success", {
          timeout: 3000,
          position: 'bottomLeft'
        });

        _this.count = res.data.votesCount;
        _this.callInProgress = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/QuestionPage.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/QuestionPage.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Question_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/Question.vue */ "./resources/js/components/Question.vue");
/* harmony import */ var _components_Answers_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Answers.vue */ "./resources/js/components/Answers.vue");
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    Question: _components_Question_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    answers: _components_Answers_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  props: ['question']
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Accept.vue?vue&type=template&id=315d9f33&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Accept.vue?vue&type=template&id=315d9f33& ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm.canAccept
      ? _c(
          "a",
          {
            class: _vm.classes,
            attrs: { title: "Mark this answers as best answer" },
            on: {
              click: function($event) {
                $event.preventDefault()
                return _vm.create($event)
              }
            }
          },
          [_c("i", { staticClass: "fas fa-check fa-2x" })]
        )
      : _vm._e(),
    _vm._v(" "),
    _vm.accepted
      ? _c(
          "a",
          {
            class: _vm.classes,
            attrs: {
              title: "The question owner accepted this answer as best answer"
            }
          },
          [_c("i", { staticClass: "fas fa-check fa-2x" })]
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Answer.vue?vue&type=template&id=98a0422e&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Answer.vue?vue&type=template&id=98a0422e& ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "media post" },
    [
      _c("vote", { attrs: { model: _vm.answer, name: "answer" } }),
      _vm._v(" "),
      _c("div", { staticClass: "media-body" }, [
        _c(
          "form",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.editing,
                expression: "editing"
              }
            ],
            on: {
              submit: function($event) {
                $event.preventDefault()
                return _vm.update($event)
              }
            }
          },
          [
            _c("div", { staticClass: "form-group" }, [
              _c("textarea", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.body,
                    expression: "body"
                  }
                ],
                staticClass: "form-control",
                attrs: { rows: "10", required: "" },
                domProps: { value: _vm.body },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.body = $event.target.value
                  }
                }
              })
            ]),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-outline-primary",
                attrs: { disabled: _vm.isInvalid }
              },
              [_vm._v("Update")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-outline-secondary",
                attrs: { type: "button" },
                on: { click: _vm.cancel }
              },
              [_vm._v("Cancel")]
            )
          ]
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: !_vm.editing,
                expression: "!editing"
              }
            ]
          },
          [
            _c("div", { domProps: { innerHTML: _vm._s(_vm.bodyHtml) } }),
            _vm._v(" "),
            _c("div", { staticClass: "row" }, [
              _c("div", { staticClass: "col-4" }, [
                _c("div", { staticClass: "ml-auto" }, [
                  _vm.authorize("modify", _vm.answer)
                    ? _c(
                        "a",
                        {
                          staticClass: "btn btn-outline-info",
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.edit($event)
                            }
                          }
                        },
                        [_vm._v("Edit")]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.authorize("modify", _vm.answer)
                    ? _c(
                        "button",
                        {
                          staticClass: "btn btn-sm btn-outline-danger",
                          on: { click: _vm.destroy }
                        },
                        [_vm._v("Delete")]
                      )
                    : _vm._e()
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-4" }),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "col-4" },
                [
                  _c("user-info", {
                    attrs: { model: _vm.answer, label: "Asked" }
                  })
                ],
                1
              )
            ])
          ]
        )
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Answers.vue?vue&type=template&id=7410c14c&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Answers.vue?vue&type=template&id=7410c14c& ***!
  \**********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _vm.count
        ? _c("div", { staticClass: "row mt-4 v-cloak" }, [
            _c("div", { staticClass: "col-md-12" }, [
              _c("div", { staticClass: "card" }, [
                _c(
                  "div",
                  { staticClass: "card-body" },
                  [
                    _c("div", { staticClass: "card-title" }, [
                      _c("h2", [_vm._v(_vm._s(_vm.title))])
                    ]),
                    _vm._v(" "),
                    _c("hr"),
                    _vm._v(" "),
                    _vm._l(_vm.answers, function(answer, index) {
                      return _c("answer", {
                        key: answer.id,
                        attrs: { answer: answer },
                        on: {
                          deleted: function($event) {
                            return _vm.remove(index)
                          }
                        }
                      })
                    }),
                    _vm._v(" "),
                    _vm.nextUrl
                      ? _c("div", { staticClass: "text-center mt-3" }, [
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-outline-secondary",
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  return _vm.fetch(_vm.nextUrl)
                                }
                              }
                            },
                            [_vm._v("Load more answers")]
                          )
                        ])
                      : _vm._e()
                  ],
                  2
                )
              ])
            ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _c("new-answer", {
        attrs: { "question-id": _vm.question.id },
        on: { created: _vm.add }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Favorite.vue?vue&type=template&id=3982b107&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Favorite.vue?vue&type=template&id=3982b107& ***!
  \***********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "a",
    {
      class: _vm.classes,
      attrs: { title: "Click to mark as favorite name (Click again to undo)" },
      on: {
        click: function($event) {
          $event.preventDefault()
          return _vm.toggle($event)
        }
      }
    },
    [
      _c("i", { staticClass: "fas fa-star fa-2x" }),
      _vm._v(" "),
      _c("span", { staticClass: "favorites-count" }, [
        _vm._v(_vm._s(_vm.count))
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/NewAnswer.vue?vue&type=template&id=cd224eba&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/NewAnswer.vue?vue&type=template&id=cd224eba& ***!
  \************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "row mt-4" }, [
    _c("div", { staticClass: "col-md-12" }, [
      _c("div", { staticClass: "card" }, [
        _c("div", { staticClass: "card-body" }, [
          _vm._m(0),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c(
            "form",
            {
              on: {
                submit: function($event) {
                  $event.preventDefault()
                  return _vm.create($event)
                }
              }
            },
            [
              _c("div", { staticClass: "from-group" }, [
                _c("textarea", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.body,
                      expression: "body"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { rows: "7", required: "", name: "body" },
                  domProps: { value: _vm.body },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.body = $event.target.value
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-lg btn-outline-primary mt-2",
                    attrs: { type: "submit", disabled: _vm.isInvalid }
                  },
                  [_vm._v(" Submit")]
                )
              ])
            ]
          )
        ])
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-title" }, [
      _c("h3", [_vm._v("Your answer")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Question.vue?vue&type=template&id=0fecee51&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Question.vue?vue&type=template&id=0fecee51& ***!
  \***********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "row justify-content-center" }, [
    _c("div", { staticClass: "col-md-12" }, [
      _c("div", { staticClass: "card" }, [
        _c(
          "form",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.editing,
                expression: "editing"
              }
            ],
            staticClass: "card-body",
            on: {
              submit: function($event) {
                $event.preventDefault()
                return _vm.update($event)
              }
            }
          },
          [
            _c("div", { staticClass: "card-title" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.title,
                    expression: "title"
                  }
                ],
                staticClass: "form-control form-control-lg",
                attrs: { type: "text" },
                domProps: { value: _vm.title },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.title = $event.target.value
                  }
                }
              })
            ]),
            _vm._v(" "),
            _c("hr"),
            _vm._v(" "),
            _c("div", { staticClass: "media" }, [
              _c("div", { staticClass: "media-body" }, [
                _c("div", { staticClass: "form-group" }, [
                  _c("textarea", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.body,
                        expression: "body"
                      }
                    ],
                    staticClass: "form-control",
                    attrs: { rows: "10", required: "" },
                    domProps: { value: _vm.body },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.body = $event.target.value
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn btn-outline-primary",
                    attrs: { disabled: _vm.isInvalid }
                  },
                  [_vm._v("Update")]
                ),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn btn-outline-secondary",
                    attrs: { type: "button" },
                    on: { click: _vm.cancel }
                  },
                  [_vm._v("Cancel")]
                )
              ])
            ])
          ]
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: !_vm.editing,
                expression: "!editing"
              }
            ],
            staticClass: "card-body"
          },
          [
            _c("div", { staticClass: "card-title" }, [
              _c("div", { staticClass: "d-flex align-items-center" }, [
                _c("h1", [_vm._v(_vm._s(_vm.title))]),
                _vm._v(" "),
                _vm._m(0)
              ])
            ]),
            _vm._v(" "),
            _c("hr"),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "media" },
              [
                _c("vote", {
                  attrs: { model: _vm.question, name: "question" }
                }),
                _vm._v(" "),
                _c("div", { staticClass: "media-body" }, [
                  _c("div", { domProps: { innerHTML: _vm._s(_vm.bodyHtml) } }),
                  _vm._v(" "),
                  _c("div", { staticClass: "row" }, [
                    _c("div", { staticClass: "col-4" }, [
                      _c("div", { staticClass: "ml-auto" }, [
                        _vm.authorize("modify", _vm.question)
                          ? _c(
                              "a",
                              {
                                staticClass: "btn btn-outline-info",
                                on: {
                                  click: function($event) {
                                    $event.preventDefault()
                                    return _vm.edit($event)
                                  }
                                }
                              },
                              [_vm._v("Edit")]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.authorize("deleteQuestion", _vm.question)
                          ? _c(
                              "button",
                              {
                                staticClass: "btn btn-sm btn-outline-danger",
                                on: { click: _vm.destroy }
                              },
                              [_vm._v("Delete")]
                            )
                          : _vm._e()
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-4" }),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "col-4" },
                      [
                        _c("user-info", {
                          attrs: { model: _vm.question, label: "Asked" }
                        })
                      ],
                      1
                    )
                  ])
                ])
              ],
              1
            )
          ]
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "ml-auto" }, [
      _c(
        "a",
        {
          staticClass: "btn btn-outline-secondary",
          attrs: { href: "/questions" }
        },
        [_vm._v("Back to all Questions")]
      )
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UserInfo.vue?vue&type=template&id=11f66ff8&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/UserInfo.vue?vue&type=template&id=11f66ff8& ***!
  \***********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("span", { staticClass: "text-muted" }, [
      _vm._v(" " + _vm._s(_vm.postDate))
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "media mt-2" }, [
      _c("a", { staticClass: "pr-2", attrs: { href: _vm.user.url } }, [
        _c("img", { attrs: { src: _vm.user.avatar } })
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "media-body mt-4" }, [
        _c("a", { attrs: { href: _vm.user.url } }, [
          _vm._v(" " + _vm._s(_vm.user.name))
        ])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Vote.vue?vue&type=template&id=40e744d5&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Vote.vue?vue&type=template&id=40e744d5& ***!
  \*******************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "d-flex flex-column vote-controls" },
    [
      _c(
        "a",
        {
          staticClass: "vote-up",
          class: _vm.classes,
          attrs: { title: _vm.title("up") },
          on: {
            click: function($event) {
              $event.preventDefault()
              return _vm.voteUp($event)
            }
          }
        },
        [_c("i", { staticClass: "fa fa-caret-up fa-3x" })]
      ),
      _vm._v(" "),
      _c("span", { staticClass: "votes-count" }, [_vm._v(_vm._s(_vm.count))]),
      _vm._v(" "),
      _c(
        "a",
        {
          staticClass: "vote-down",
          class: _vm.classes,
          attrs: { title: _vm.title("down") },
          on: {
            click: function($event) {
              $event.preventDefault()
              return _vm.voteDown($event)
            }
          }
        },
        [_c("i", { staticClass: "fas fa-caret-down  fa-3x" })]
      ),
      _vm._v(" "),
      _vm.name === "question"
        ? _c("favorite", { attrs: { question: _vm.model } })
        : _vm._e(),
      _vm._v(" "),
      _vm.name === "answer"
        ? _c("accept", { attrs: { answer: _vm.model } })
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/QuestionPage.vue?vue&type=template&id=237c871e&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/QuestionPage.vue?vue&type=template&id=237c871e& ***!
  \**********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "container" },
    [
      _c("question", { attrs: { question: _vm.question } }),
      _vm._v(" "),
      _c("answers", { attrs: { question: _vm.question } })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./resources/js/components/Accept.vue":
/*!********************************************!*\
  !*** ./resources/js/components/Accept.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Accept_vue_vue_type_template_id_315d9f33___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Accept.vue?vue&type=template&id=315d9f33& */ "./resources/js/components/Accept.vue?vue&type=template&id=315d9f33&");
/* harmony import */ var _Accept_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Accept.vue?vue&type=script&lang=js& */ "./resources/js/components/Accept.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Accept_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Accept_vue_vue_type_template_id_315d9f33___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Accept_vue_vue_type_template_id_315d9f33___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Accept.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Accept.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/components/Accept.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Accept_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Accept.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Accept.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Accept_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Accept.vue?vue&type=template&id=315d9f33&":
/*!***************************************************************************!*\
  !*** ./resources/js/components/Accept.vue?vue&type=template&id=315d9f33& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Accept_vue_vue_type_template_id_315d9f33___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Accept.vue?vue&type=template&id=315d9f33& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Accept.vue?vue&type=template&id=315d9f33&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Accept_vue_vue_type_template_id_315d9f33___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Accept_vue_vue_type_template_id_315d9f33___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Answer.vue":
/*!********************************************!*\
  !*** ./resources/js/components/Answer.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Answer_vue_vue_type_template_id_98a0422e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Answer.vue?vue&type=template&id=98a0422e& */ "./resources/js/components/Answer.vue?vue&type=template&id=98a0422e&");
/* harmony import */ var _Answer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Answer.vue?vue&type=script&lang=js& */ "./resources/js/components/Answer.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Answer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Answer_vue_vue_type_template_id_98a0422e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Answer_vue_vue_type_template_id_98a0422e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Answer.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Answer.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/components/Answer.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Answer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Answer.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Answer.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Answer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Answer.vue?vue&type=template&id=98a0422e&":
/*!***************************************************************************!*\
  !*** ./resources/js/components/Answer.vue?vue&type=template&id=98a0422e& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Answer_vue_vue_type_template_id_98a0422e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Answer.vue?vue&type=template&id=98a0422e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Answer.vue?vue&type=template&id=98a0422e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Answer_vue_vue_type_template_id_98a0422e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Answer_vue_vue_type_template_id_98a0422e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Answers.vue":
/*!*********************************************!*\
  !*** ./resources/js/components/Answers.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Answers_vue_vue_type_template_id_7410c14c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Answers.vue?vue&type=template&id=7410c14c& */ "./resources/js/components/Answers.vue?vue&type=template&id=7410c14c&");
/* harmony import */ var _Answers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Answers.vue?vue&type=script&lang=js& */ "./resources/js/components/Answers.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Answers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Answers_vue_vue_type_template_id_7410c14c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Answers_vue_vue_type_template_id_7410c14c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Answers.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Answers.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/js/components/Answers.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Answers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Answers.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Answers.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Answers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Answers.vue?vue&type=template&id=7410c14c&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/Answers.vue?vue&type=template&id=7410c14c& ***!
  \****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Answers_vue_vue_type_template_id_7410c14c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Answers.vue?vue&type=template&id=7410c14c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Answers.vue?vue&type=template&id=7410c14c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Answers_vue_vue_type_template_id_7410c14c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Answers_vue_vue_type_template_id_7410c14c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Favorite.vue":
/*!**********************************************!*\
  !*** ./resources/js/components/Favorite.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Favorite_vue_vue_type_template_id_3982b107___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Favorite.vue?vue&type=template&id=3982b107& */ "./resources/js/components/Favorite.vue?vue&type=template&id=3982b107&");
/* harmony import */ var _Favorite_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Favorite.vue?vue&type=script&lang=js& */ "./resources/js/components/Favorite.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Favorite_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Favorite_vue_vue_type_template_id_3982b107___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Favorite_vue_vue_type_template_id_3982b107___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Favorite.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Favorite.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/components/Favorite.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Favorite_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Favorite.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Favorite.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Favorite_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Favorite.vue?vue&type=template&id=3982b107&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/Favorite.vue?vue&type=template&id=3982b107& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Favorite_vue_vue_type_template_id_3982b107___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Favorite.vue?vue&type=template&id=3982b107& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Favorite.vue?vue&type=template&id=3982b107&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Favorite_vue_vue_type_template_id_3982b107___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Favorite_vue_vue_type_template_id_3982b107___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/NewAnswer.vue":
/*!***********************************************!*\
  !*** ./resources/js/components/NewAnswer.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewAnswer_vue_vue_type_template_id_cd224eba___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewAnswer.vue?vue&type=template&id=cd224eba& */ "./resources/js/components/NewAnswer.vue?vue&type=template&id=cd224eba&");
/* harmony import */ var _NewAnswer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewAnswer.vue?vue&type=script&lang=js& */ "./resources/js/components/NewAnswer.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NewAnswer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NewAnswer_vue_vue_type_template_id_cd224eba___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NewAnswer_vue_vue_type_template_id_cd224eba___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/NewAnswer.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/NewAnswer.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/components/NewAnswer.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewAnswer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./NewAnswer.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/NewAnswer.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewAnswer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/NewAnswer.vue?vue&type=template&id=cd224eba&":
/*!******************************************************************************!*\
  !*** ./resources/js/components/NewAnswer.vue?vue&type=template&id=cd224eba& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewAnswer_vue_vue_type_template_id_cd224eba___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./NewAnswer.vue?vue&type=template&id=cd224eba& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/NewAnswer.vue?vue&type=template&id=cd224eba&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewAnswer_vue_vue_type_template_id_cd224eba___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewAnswer_vue_vue_type_template_id_cd224eba___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Question.vue":
/*!**********************************************!*\
  !*** ./resources/js/components/Question.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Question_vue_vue_type_template_id_0fecee51___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Question.vue?vue&type=template&id=0fecee51& */ "./resources/js/components/Question.vue?vue&type=template&id=0fecee51&");
/* harmony import */ var _Question_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Question.vue?vue&type=script&lang=js& */ "./resources/js/components/Question.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Question_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Question_vue_vue_type_template_id_0fecee51___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Question_vue_vue_type_template_id_0fecee51___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Question.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Question.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/components/Question.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Question_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Question.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Question.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Question_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Question.vue?vue&type=template&id=0fecee51&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/Question.vue?vue&type=template&id=0fecee51& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Question_vue_vue_type_template_id_0fecee51___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Question.vue?vue&type=template&id=0fecee51& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Question.vue?vue&type=template&id=0fecee51&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Question_vue_vue_type_template_id_0fecee51___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Question_vue_vue_type_template_id_0fecee51___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/UserInfo.vue":
/*!**********************************************!*\
  !*** ./resources/js/components/UserInfo.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserInfo_vue_vue_type_template_id_11f66ff8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserInfo.vue?vue&type=template&id=11f66ff8& */ "./resources/js/components/UserInfo.vue?vue&type=template&id=11f66ff8&");
/* harmony import */ var _UserInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserInfo.vue?vue&type=script&lang=js& */ "./resources/js/components/UserInfo.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UserInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserInfo_vue_vue_type_template_id_11f66ff8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserInfo_vue_vue_type_template_id_11f66ff8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/UserInfo.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/UserInfo.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/components/UserInfo.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./UserInfo.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UserInfo.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/UserInfo.vue?vue&type=template&id=11f66ff8&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/UserInfo.vue?vue&type=template&id=11f66ff8& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserInfo_vue_vue_type_template_id_11f66ff8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./UserInfo.vue?vue&type=template&id=11f66ff8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/UserInfo.vue?vue&type=template&id=11f66ff8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserInfo_vue_vue_type_template_id_11f66ff8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserInfo_vue_vue_type_template_id_11f66ff8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Vote.vue":
/*!******************************************!*\
  !*** ./resources/js/components/Vote.vue ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Vote_vue_vue_type_template_id_40e744d5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vote.vue?vue&type=template&id=40e744d5& */ "./resources/js/components/Vote.vue?vue&type=template&id=40e744d5&");
/* harmony import */ var _Vote_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Vote.vue?vue&type=script&lang=js& */ "./resources/js/components/Vote.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Vote_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Vote_vue_vue_type_template_id_40e744d5___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Vote_vue_vue_type_template_id_40e744d5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Vote.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Vote.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./resources/js/components/Vote.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Vote_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Vote.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Vote.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Vote_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Vote.vue?vue&type=template&id=40e744d5&":
/*!*************************************************************************!*\
  !*** ./resources/js/components/Vote.vue?vue&type=template&id=40e744d5& ***!
  \*************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Vote_vue_vue_type_template_id_40e744d5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Vote.vue?vue&type=template&id=40e744d5& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Vote.vue?vue&type=template&id=40e744d5&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Vote_vue_vue_type_template_id_40e744d5___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Vote_vue_vue_type_template_id_40e744d5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/event-bus.js":
/*!***********************************!*\
  !*** ./resources/js/event-bus.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var eventBus = new vue__WEBPACK_IMPORTED_MODULE_0___default.a();
/* harmony default export */ __webpack_exports__["default"] = (eventBus);

/***/ }),

/***/ "./resources/js/pages/QuestionPage.vue":
/*!*********************************************!*\
  !*** ./resources/js/pages/QuestionPage.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _QuestionPage_vue_vue_type_template_id_237c871e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./QuestionPage.vue?vue&type=template&id=237c871e& */ "./resources/js/pages/QuestionPage.vue?vue&type=template&id=237c871e&");
/* harmony import */ var _QuestionPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QuestionPage.vue?vue&type=script&lang=js& */ "./resources/js/pages/QuestionPage.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _QuestionPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _QuestionPage_vue_vue_type_template_id_237c871e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _QuestionPage_vue_vue_type_template_id_237c871e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/QuestionPage.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/QuestionPage.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/js/pages/QuestionPage.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QuestionPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./QuestionPage.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/QuestionPage.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QuestionPage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/QuestionPage.vue?vue&type=template&id=237c871e&":
/*!****************************************************************************!*\
  !*** ./resources/js/pages/QuestionPage.vue?vue&type=template&id=237c871e& ***!
  \****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_QuestionPage_vue_vue_type_template_id_237c871e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./QuestionPage.vue?vue&type=template&id=237c871e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/QuestionPage.vue?vue&type=template&id=237c871e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_QuestionPage_vue_vue_type_template_id_237c871e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_QuestionPage_vue_vue_type_template_id_237c871e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);