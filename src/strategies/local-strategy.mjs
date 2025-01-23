import passport from 'passport';
import LocalStrategy from 'passport-local';
import { mockUsers } from '../utils/constants.mjs';

export default passport.use(
  new LocalStrategy((username, password, done) => {
    console.log(`username: ${username}`);
    console.log(`password: ${password}`);
    try {
      const findUser = mockUsers.find((user) => user.username === username);
      if (!findUser) throw new Error('User not found');
      if (findUser.password !== password) throw new Error('Invalid credentials');
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);
 