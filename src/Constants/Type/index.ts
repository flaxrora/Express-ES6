export default {
    number: (data: number) => (typeof data) === 'number' && !isNaN(data),
    string: (data: string) => (typeof data) === 'string',
    date: (data: Date) => (data instanceof Date),
    boolean: (data: Boolean) => (typeof data) === 'boolean',
    object: (data: Object) => (typeof data) === 'object',
    function: (data: Function) => (typeof data) === 'function',
};

export const types = [
    'number',
    'string',
    'date',
    'boolean',
    'object'
];
