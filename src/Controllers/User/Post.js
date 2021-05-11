import asyncHandler from 'express-async-handler';
import DBUser from '../../Entity/User';
import { TypeChecker } from '../../Entity/Concrete/RuntimeTyping';
import SingletonContainer from '../../Service/Singleton';

export default asyncHandler(async (req, res) => {
    const { UserName, Password } = req.body;

    const typer = SingletonContainer.get('typer');
    TypeChecker.Check(typer.type({
        UserName: typer.string,
        Password: typer.string
    }), { UserName, Password });

    const _user = await new DBUser().Save({ Password, UserName });

    res.status(200).json({
        Success: true,
        User: _user,
        Token: await _user.Login({ Password, UserName })
    });
});
