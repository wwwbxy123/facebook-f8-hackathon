import User from '../models/User';


const checkDoBasicQuestion = async (userId) => {

    const user = await User.findOne({
        userId
    });

    console.log(user)

    // if (user.city is exists && )

    return true
    // TODO
    // goto mongo
    // check db's three records
    // return true or false
};
  
export default checkDoBasicQuestion;
  