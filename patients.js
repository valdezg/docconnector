const express = require('express');
const axios = require('axios');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// // bring in normalize to give us a proper url, regardless of what user entered
// const normalize = require('normalize-url');
const checkObjectId = require('../../middleware/checkObjectId');

const Patient = require('../../models/Patient');
const User = require('../../models/User');
const Post = require('../../models/Post');



router.post(
  '/',
  auth,
  check('status', 'Status is required').notEmpty(),
  check('skills', 'Skills is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      website,
      skills,
      // youtube,
      status
      // instagram,
      // linkedin,
      // facebook,
      // // spread the rest of the fields we don't need to check
      // ...rest
    } = req.body;

    // build a profile
    const patientFields = {
      user: req.user.id,

      status: Array.isArray(status),
        
      // website:
      //   website && website !== ''
      //     ? normalize(website, { forceHttps: true })
      //     : '',
      skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map((skill) => ' ' + skill.trim())
    };

    // Build socialFields object
    //const socialFields = { youtube, twitter, instagram, linkedin, facebook };

    // normalize social fields to ensure valid url
    // for (const [key, value] of Object.entries(socialFields)) {
    //   if (value && value.length > 0)
    //     socialFields[key] = normalize(value, { forceHttps: true });
    // }
    // add to profileFields
    //profileFields.social = socialFields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let patient = await Patient.findOneAndUpdate(
        { user: req.user.id },
        { $set: patientFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json(patient);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);






// @route    patient api/patients
// @desc     Create a patient
// @access   Private
// router.post(
//   '/',
//   auth,
//   check('text', 'Text is required').notEmpty(),
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const user = await User.findById(req.user.id).select('-password');

//       const newPatient = new Patient({
//         text: req.body.text,
//         name: user.name,
//         avatar: user.avatar,
//         user: req.user.id
//       });

//       const patient = await newPatient.save();

//       res.json(patient);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

// @route    GET api/patients
// @desc     Get all patients
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const patients = await Patient.find().sort({ date: -1 });
    res.json(patients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/patients/:id
// @desc     Get patient by ID
// @access   Private
router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ msg: 'patient not found' });
    }

    res.json(patient);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// // @route    DELETE api/patients/:id
// // @desc     Delete a patient
// // @access   Private
// router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
//   try {
//     const patient = await Patient.findById(req.params.id);

//     if (!patient) {
//       return res.status(404).json({ msg: 'patient not found' });
//     }

//     // Check user
//     if (patient.user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: 'User not authorized' });
//     }

//     await patient.remove();

//     res.json({ msg: 'Patient removed' });
//   } catch (err) {
//     console.error(err.message);

//     res.status(500).send('Server Error');
//   }
// });

// // @route    PUT api/patients/like/:id
// // @desc     Like a patient
// // @access   Private
// router.put('/like/:id', auth, checkObjectId('id'), async (req, res) => {
//   try {
//     const patient = await Patient.findById(req.params.id);

//     // Check if the patient has already been liked
//     if (patient.likes.some((like) => like.user.toString() === req.user.id)) {
//       return res.status(400).json({ msg: 'Patient already liked' });
//     }

//     patient.likes.unshift({ user: req.user.id });

//     await patient.save();

//     return res.json(patient.likes);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// // @route    PUT api/patients/unlike/:id
// // @desc     Unlike a patient
// // @access   Private
// router.put('/unlike/:id', auth, checkObjectId('id'), async (req, res) => {
//   try {
//     const patient = await Patient.findById(req.params.id);

//     // Check if the patient has not yet been liked
//     if (!patient.likes.some((like) => like.user.toString() === req.user.id)) {
//       return res.status(400).json({ msg: 'Patient has not yet been liked' });
//     }

//     // remove the like
//     patient.likes = patient.likes.filter(
//       ({ user }) => user.toString() !== req.user.id
//     );

//     await patient.save();

//     return res.json(patient.likes);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// // @route    patient api/patients/comment/:id
// // @desc     Comment on a patient
// // @access   Private
// router.patient(
//   '/comment/:id',
//   auth,
//   checkObjectId('id'),
//   check('text', 'Text is required').notEmpty(),
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const user = await User.findById(req.user.id).select('-password');
//       const patient = await patient.findById(req.params.id);

//       const newComment = {
//         text: req.body.text,
//         name: user.name,
//         avatar: user.avatar,
//         user: req.user.id
//       };

//       patient.comments.unshift(newComment);

//       await patient.save();

//       res.json(patient.comments);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

// // @route    DELETE api/patients/comment/:id/:comment_id
// // @desc     Delete comment
// // @access   Private
// // router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
// //   try {
// //     const patient = await patient.findById(req.params.id);

// //     // Pull out comment
// //     const comment = patient.comments.find(
// //       (comment) => comment.id === req.params.comment_id
// //     );
// //     // Make sure comment exists
// //     if (!comment) {
// //       return res.status(404).json({ msg: 'Comment does not exist' });
// //     }
// //     // Check user
// //     if (comment.user.toString() !== req.user.id) {
// //       return res.status(401).json({ msg: 'User not authorized' });
// //     }

// //     patient.comments = patient.comments.filter(
// //       ({ id }) => id !== req.params.comment_id
// //     );

// //     await patient.save();

// //     return res.json(patient.comments);
// //   } catch (err) {
// //     console.error(err.message);
// //     return res.status(500).send('Server Error');
// //   }
// });

module.exports = router;