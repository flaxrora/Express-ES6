class CustomError extends Error {
    Name: string;
    Message: string;
    Status: number;
    constructor(Message: string, Status = 400) {
        super(Message);
        this.Name = 'CustomError';
        this.Status = Status;
        this.Message = Message;
    }
}
export default CustomError;
