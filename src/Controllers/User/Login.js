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

    res.status(200).json({
        Success: true,
        Token: await new DBUser().Login({ Password, UserName })
    });
});
