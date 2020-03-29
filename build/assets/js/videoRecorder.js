"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var recorderContainer = document.getElementById("jsRecordContainer");
var recordBtn = document.getElementById("jsRecordBtn");
var videoPreview = document.getElementById("jsVideoPreview");
var streamObject;
var videoRecorder;

var handleVideoData = function handleVideoData(e) {
  var videoFile = e.data;
  var link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

var stopRecording = function stopRecording() {
  videoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording); // eslint-disable-next-line no-use-before-define

  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Start recording";
};

var startRecording = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            videoRecorder = new MediaRecorder(streamObject);
            videoRecorder.start();
            videoRecorder.addEventListener("dataavailable", handleVideoData);
            recordBtn.addEventListener("click", stopRecording);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function startRecording() {
    return _ref.apply(this, arguments);
  };
}();

var getVideo = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var stream;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return navigator.mediaDevices.getUserMedia({
              audio: true // video: { width: 1280, height: 720 }

            });

          case 3:
            stream = _context2.sent;
            videoPreview.srcObject = stream;
            videoPreview.muted = true;
            videoPreview.play();
            recordBtn.innerHTML = "Stop recording";
            streamObject = stream;
            startRecording();
            _context2.next = 16;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            console.dir(_context2.t0);
            recordBtn.innerHTML = "☹️ Cant record";

          case 16:
            _context2.prev = 16;
            recordBtn.removeEventListener("click", getVideo);
            return _context2.finish(16);

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 12, 16, 19]]);
  }));

  return function getVideo() {
    return _ref2.apply(this, arguments);
  };
}();

function init() {
  recordBtn.addEventListener("click", getVideo);
}

if (recorderContainer) {
  init();
}