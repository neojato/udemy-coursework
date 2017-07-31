"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase_config_1 = require("./src/environments/firebase.config");
var firebase_1 = require("firebase");
var Queue = require('firebase-queue');
console.log('Running batch server ...');
firebase_1.initializeApp(firebase_config_1.firebaseConfig);
firebase_1.auth()
    .signInWithEmailAndPassword('admin@email.com', 'Test123')
    .then(runConsumer)
    .catch(onError);
function onError(err) {
    console.error('Could not login', err);
    process.exit();
}
function runConsumer() {
    console.log('Running consumer ...');
    var lessonsRef = firebase_1.database().ref('lessons');
    var lessonsPerCourseRef = firebase_1.database().ref('lessonsPerCourse');
    var queueRef = firebase_1.database().ref('queue');
    var queue = new Queue(queueRef, function (data, progress, resolve, reject) {
        console.log('received delete request ...', data);
        var deleteLessonPromise = lessonsRef.child(data.lessonId).remove();
        var deleteLessonPerCoursePromise = lessonsPerCourseRef.child(data.courseId + "/" + data.lessonId).remove();
        Promise.all([deleteLessonPromise, deleteLessonPerCoursePromise])
            .then(function () {
            console.log('lesson deleted');
            resolve();
        })
            .catch(function () {
            console.log('lesson deletion in error');
            reject();
        });
    });
}
//# sourceMappingURL=/Users/trinominis/Documents/projects/udemy/ng2andFirebase/final-project/ts-node-3aa524d9b327cb3b59f3528060d601b2dfb7dc9d2231d2b859f7c4b026e51c86/548be3585e5af6e8118075ecb5072765a46e324721bcf7ff0c9b71310ff51840/36c30bd519506f1897f87e38cf99e18e24fd16aea961715078b95900d24e6740.js.map