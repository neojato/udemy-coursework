"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase_1 = require("firebase");
var firebase_config_1 = require("./src/environments/firebase.config");
var db_data_1 = require("./db-data");
console.log('Initizalizing Firebase database ... ');
firebase_1.initializeApp(firebase_config_1.firebaseConfig);
var coursesRef = firebase_1.database().ref('courses');
var lessonsRef = firebase_1.database().ref('lessons');
db_data_1.dbData.courses.forEach(function (course) {
    console.log('adding course', course.url);
    var courseRef = coursesRef.push({
        url: course.url,
        description: course.description,
        iconUrl: course.iconUrl,
        courseListIcon: course.courseListIcon,
        longDescription: course.longDescription
    });
    var lessonKeysPerCourse = [];
    course.lessons.forEach(function (lesson) {
        console.log('adding lesson ', lesson.url);
        lessonKeysPerCourse.push(lessonsRef.push({
            description: lesson.description,
            duration: lesson.duration,
            url: lesson.url,
            tags: lesson.tags,
            videoUrl: lesson.videoUrl || null,
            longDescription: lesson.longDescription,
            courseId: courseRef.key
        }).key);
    });
    var association = firebase_1.database().ref('lessonsPerCourse');
    var lessonsPerCourse = association.child(courseRef.key);
    lessonKeysPerCourse.forEach(function (lessonKey) {
        console.log('adding lesson to course ');
        var lessonCourseAssociation = lessonsPerCourse.child(lessonKey);
        lessonCourseAssociation.set(true);
    });
});
//# sourceMappingURL=/Users/trinominis/Documents/projects/udemy/ng2andFirebase/final-project/ts-node-3aa524d9b327cb3b59f3528060d601b2dfb7dc9d2231d2b859f7c4b026e51c86/f67f1316b799243f77f70f0ca9047529ab092eb24272742b8b35e60f2659c3d2/d299877d9963f3ca7c53fb8fd09682ae1b56af836bf9f87c29f0e01204cf59c4.js.map