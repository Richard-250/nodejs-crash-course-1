import passport from 'passport';
import LocalStrategy from 'passport-local';
import { mockUsers } from '../utils/constants.mjs';
import { User } from '../mongoose/schemas/user.mjs';
import { comparedPassword } from '../utils/helpers.mjs';

passport.serializeUser((user, done) => {
  console.log(`Inside sereialize User`);
  console.log(user);
done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
  console.log(`Inside Deserialize User`);
  console.log(`Deserialize user Id:${id} `);
  try {
    const findUser = await User.findById(id)
    if (!findUser) throw new Error("User Not Found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

passport.serializeUser((user, done) => {
  console.log(`Inside sereialize User`);
  console.log(user);
done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
  console.log(`Inside Deserialize User`);
  console.log(`Deserialize user Id:${id} `);
  try {
    const findUser = await User.findById(id)
    if (!findUser) throw new Error("User Not Found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new LocalStrategy( async (username, password, done) => {
    try {
     const findUser = await User.findOne({ username });
     if (!findUser) throw new Error('User not found');
     if (!comparedPassword(password, findUser.password)) throw new Error('Bad credentials');
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);
  