var Plants = require('./plantsModel.js');
    Q = require('q');
var findPlant = Q.nbind(Plant.findOne, Plant);
var createPlant = Q.nbind(Plant.create, Plant);
var findAllPlants = Q.nbind(Plant.find, Plant);

module.exports = {

//   allPlants: function (req, res, next) {
//   findAllPlants({})
//     .then(function (plants) {
//       res.json(plants);
//     })
//     .fail(function (error) {
//       next(error);
//     });
//   },

//   newPlant: function (req, res, next) {
//     var name = req.body.name;
//     findPlant({name: name})
//       .then(function (match) {
//         if (match) {
//           res.send(match);
//         } else {
//           return util.getUrlTitle(url);
//         }
//       })
//       .then(function (title) {
//         if (title) {
//           var newLink = {
//             url: url,
//             visits: 0,
//             base_url: req.headers.origin,
//             title: title
//           };
//           return createLink(newLink);
//         }
//       })
//       .then(function (createdLink) {
//         if (createdLink) {
//           res.json(createdLink);
//         }
//       })
//       .fail(function (error) {
//         next(error);
//       });
//   },

//   navToLink: function (req, res, next) {
//     findLink({code: req.params.code})
//       .then(function (link) {
//         if (!link) {
//           return next(new Error('Link not added yet'));
//         }

//         link.visits++;
//         link.save(function (err, savedLink) {
//           if (err) {
//             next(err);
//           } else {
//             res.redirect(savedLink.url);
//           }
//         });
//       })
//       .fail(function (error) {
//         next(error);
//       });
//   }

// };
