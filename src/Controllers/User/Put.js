import asyncHandler from 'express-async-handler';
import { TypeChecker } from '../../Entity/Concrete/RuntimeTyping';
import SingletonContainer from '../../Service/Singleton';

export default asyncHandler(async (req, res) => {
    const { Password } = req.body;

    const typer = SingletonContainer.get('typer');
    TypeChecker.Check(typer.type({
        Password: typer.string

    }), { Password });

    await req.User.Update(Password);

    res.status(200).json({
        Success: true,
        User: req.User
    });
});
