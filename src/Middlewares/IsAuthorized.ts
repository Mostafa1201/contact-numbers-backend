import * as jwt from 'jsonwebtoken';
import { ModelBase } from '../Core/models/ModelBase';
import { UserEntity } from '../Entities/UserEntity';
export async function IsAuthorized(req:any, res:any, next:Function) {

    var token;
    if (req.headers && req.headers.authorization) {
      var parts = (<string>req.headers.authorization).split(' ');
      if (parts.length == 2) {
        var scheme = parts[0],
          credentials = parts[1];
        if (scheme == 'JWT') {
          token = credentials;
          let decode = jwt.decode(token);
          req.user = decode;
          let user_id = req.user?.id;
          let userModel = new ModelBase(new UserEntity());
          let user = await userModel.findOne({ equalTo:{id: user_id }});
          console.log("user: ",user);
          
          if (!user)
            return res.status(400).json({ message: " there is no user with this id" });
          req.user = user;
          next();
        }else {
          return res.status(400).json({ message: 'Token is not defined' });
        }
      } else {
        return res.status(400).json({ message: 'Format is Authorization: Bearer [token]' });
      }
    }

}