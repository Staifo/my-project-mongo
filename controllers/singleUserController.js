const singleUser = require("../models/singleUser");
const bcrypt = require("bcrypt");

exports.list_user = (req, res) => {
  singleUser
    .find()
    .then((data) => res.json(data))
    .catch((err) => console.log(err.message));
};

exports.find_user = (req, res) => {
  const { id } = req.params;
  singleUser
    .findById(id)
    .then((data) => res.json(data))
    .catch((err) => console.error(err.message));
};

exports.create_user = async (req, res) => {
  const {
    motivational,
    job_title,
    first_name,
    last_name,
    email,
    video,
    profile_pic,
    CV,
    phone,
    transfer_skills,
    coding_skills,
    further_hard_skills,
    password,
    last_updated,
    dob,
    street,
    city,
    postal_code,
    province,
    country,
    relocate,
    available,
    personal_url,
    github_url,
    portfolio_url,
    linkedin_url,
    xing_url,
    twitter,
  } = req.body;

  console.log(req.body)
  // console.log(first_name, last_name)

  // Promise-based syntax
  // Student.create({ first_name, last_name })
  //   .then(data => res.json(data))
  //   .catch(err => console.error(err.message))

  // Async-Await Syntax

  try {
    let user = await singleUser.findOne({ email });
    if (user) return res.status(400).send("This student already exists");
    user = new singleUser({
      motivational,
      job_title,
      first_name,
      last_name,
      email,
      video,
      profile_pic,
      CV,
      phone,
      transfer_skills,
      coding_skills,
      further_hard_skills,
      password: await bcrypt.hash(password, 10),
      last_updated,
      dob,
      street,
      city,
      postal_code,
      province,
      country,
      relocate,
      available,
      personal_url,
      github_url,
      portfolio_url,
      linkedin_url,
      xing_url,
      twitter,
    });

    await user.save();

    // user._id 

    // npm i jsonwebtoken
    // read the doc, specially about the jwt.sign section

    // jwt.sign({
    //   data: 'foobar'
    // }, 'secret', { expiresIn: '1h' });

    // this syntax gives you back a token, you have to store it in a variable

    // please change the payload to a custom object like

    // {
    //   id: user._id,
    //   email: user.email
    // }

    // <Please change 'secret' to process.env.JWT_SECRET

    res
      .set("x-authorization-token", user.createToken())
      .send({ _id: user._id, email: user.email });
  } catch (e) {
    console.error(e.message);
  }
};

exports.update_user = (req, res) => {
  const { id } = req.params;
console.log(id)
console.log(req.body)
  const options = { new: true };

  singleUser.findByIdAndUpdate(id, req.body, options, (err, result) => {
    if (err) return res.status(404).send("No such user");
    res.status(200).send(result);
  });
};

exports.delete_user = (req, res) => {
  const { id } = req.params;
  singleUser
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((err) => console.error(err.message));
};
