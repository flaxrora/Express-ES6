import SingletonContainer from '../../Service/Singleton';

const Typer = SingletonContainer.get('typer');

export const TBaseCollection = Typer.type({
    Name: Typer.string,
    DocumentCount: new Typer.NumberType(),
    CreationDate: Typer.string,
    UpdateDate: Typer.string,
    UserId: Typer.string
});

export const TDatabaseUser = Typer.type({
    UserName: Typer.string,
    Password: Typer.string
});
