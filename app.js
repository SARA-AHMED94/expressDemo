const Joi = require('joi')
const express = require('express');
const app = express();
app.use(express.json())


const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" },
]


// ========================================== handle Get request ========================================== //

//  first endpoint to get all courses

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

//  second endpoint to get single course

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id))
    if (!course) {
        res.status(404).send("the course with given id is not found")
        return;
    }
    res.send(course)
})



// ========================================== handle Post request ========================================== //



// handle without validation

// app.post('/api/courses', (req, res) => {
//     const course = {
//         id: courses.length + 1,
//         name: req.body.name
//     }
//     courses.push(course);
//     res.send(course)
// })










// handle with basic  validation

// app.post('/api/courses', (req, res) => {

//     if (!req.body.name || req.body.name.length < 3) {
//         res.status(400).send("Name is required and should be minimum 3 characters.");
//         return;
//     }
//     const course = {
//         id: courses.length + 1,
//         name: req.body.name
//     }
//     courses.push(course);
//     res.send(course)
// })






// handle with joi  validation

// app.post('/api/courses', (req, res) => {
//     const schema = {
//         name: Joi.string().min(3).required()
//     };

//     const result = Joi.validate(req.body, schema);
//     console.log(result)

//     if (result.error) {
//         res.status(400).send(result.error.details[0].message);
//         return;
//     }
//     const course = {
//         id: courses.length + 1,
//         name: req.body.name
//     }
//     courses.push(course);
//     res.send(course)
// })










// ========================================== handle Put request ========================================== //



app.put('/api/courses/:id', (req, res) => {

    // search for course
    // if not exist return 404
    const course = courses.find(c => c.id == parseInt(req.params.id))
    if (!course) {
        res.status(404).send("the course with given id is not found")
        return;
    }

    // validate
    //if invalid ,return 404

    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    //update course
    course.name = req.body.name;
    // return updated course
    res.send(course)
})





// ========================================== handle Delete request ========================================== //



app.delete('/api/courses/:id', (req, res) => {
    // search for course
    // if not exist return 404
    const course = courses.find(c => c.id == parseInt(req.params.id))
    if (!course) {
        res.status(404).send("the course with given id is not found")
        return;
    }

    // delete course
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    //return the same course
    res.send(course)
})




const port = process.env.PORT || 3000
app.listen(port, () => { console.log(`listening on port ${port}...`) })