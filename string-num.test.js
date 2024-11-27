let stringNum;

beforeEach(() => {
    stringNum = require('./string-num');
});

describe('Initialization', () => {
    test('Initialization', () => {
        expect(stringNum('449').val()).toBe('449');
    });

    test('Initialization negative number', () => {
        expect(stringNum('-1').val()).toBe('-1');
    });
});

describe('Addition', () => {
    test('Add with zero', () => {
        expect(stringNum('141').add(stringNum('0')).val()).toBe('141');
    });

    test('Add 2 numbers', () => {
        expect(stringNum('141').add(stringNum('561')).val()).toBe('702');
    });

    test('Add 2 different length numbers', () => {
        expect(stringNum('3141').add(stringNum('561')).val()).toBe('3702');
    });

    test('Add positive and negative numbers', () => {
        expect(stringNum('3141').add(stringNum('-561')).val()).toBe('2580');
    });

    test('Add positive and larger negative numbers', () => {
        expect(stringNum('3141').add(stringNum('-5561')).val()).toBe('-2420');
    });

    test('Add positive and negative numbers with same abs', () => {
        expect(stringNum('3141').add(stringNum('-3141')).val()).toBe('0');
    });

    test('Add 2 negative numbers', () => {
        expect(stringNum('-177').add(stringNum('-3141')).val()).toBe('-3318');
    });
});

describe('Subtraction', () => {
    test('Subtract with zero', () => {
        expect(stringNum('141').sub(stringNum('0')).val()).toBe('141');
    });

    test('Subtract 2 numbers', () => {
        expect(stringNum('561').sub(stringNum('141')).val()).toBe('420');
    });

    test('Subtract 2 different length numbers', () => {
        expect(stringNum('4561').sub(stringNum('141')).val()).toBe('4420');
    });

    test('Subtract a number with a larger number', () => {
        expect(stringNum('4561').sub(stringNum('5141')).val()).toBe('-580');
    });

    test('Subtract two negative numbers', () => {
        expect(stringNum('-4561').sub(stringNum('-5141')).val()).toBe('580');
    });

    test('Subtract two negative numbers, negative result', () => {
        expect(stringNum('-5141').sub(stringNum('-4561')).val()).toBe('-580');
    });

    test('Subtract a number with a negative number', () => {
        expect(stringNum('4561').sub(stringNum('-5141')).val()).toBe('9702');
    });

    test('Subtract a negative number with a positive number', () => {
        expect(stringNum('-4561').sub(stringNum('5141')).val()).toBe('-9702');
    });
});

describe('Multiplication', () => {
    test('Multiply by zero', () => {
        expect(stringNum('141').multiply(stringNum('0')).val()).toBe('0');
    });

    test('Multiply 2 numbers', () => {
        expect(stringNum('6').multiply(stringNum('4')).val()).toBe('24');
    });

    test('Multiply 2 long numbers', () => {
        expect(stringNum('141').multiply(stringNum('561')).val()).toBe('79101');
    });
});

describe('Factorial', () => {
    test('1!', () => {
        expect(stringNum('1').fact().val()).toBe('1');
    });

    test('5!', () => {
        expect(stringNum('5').fact().val()).toBe('120');
    });

    test('9!', () => {
        expect(stringNum('9').fact().val()).toBe('362880');
    })

    test('15!', () => {
        expect(stringNum('15').fact().val()).toBe('1307674368000');
    })
});

describe('Absolute', () => {
    test('abs(1) = 1', () => {
        expect(stringNum('1').abs().val()).toBe('1');
    });

    test('abs(-1) = 1', () => {
        expect(stringNum('-1').abs().val()).toBe('1');
    });
});

describe('Fibonacci', () => {
    test('fib(0) = 0', () => {
        expect(stringNum('0').fib().val()).toBe('0');
    })

    test('fib(1) = 1', () => {
        expect(stringNum('1').fib().val()).toBe('1');
    })

    test('fib(2) = 1', () => {
        expect(stringNum('2').fib().val()).toBe('1');
    })

    test('fib(3) = 2', () => {
        expect(stringNum('3').fib().val()).toBe('2');
    })

    test('fib(4) = 3', () => {
        expect(stringNum('4').fib().val()).toBe('3');
    })

    test('fib(5) = 5', () => {
        expect(stringNum('5').fib().val()).toBe('5');
    })

    test('fib(-6) = -8', () => {
        expect(stringNum('-6').fib().val()).toBe('-8');
    })
});

describe('Positive/Negative', () => {
    test('1', () => {
        expect(stringNum('1').isPositive()).toBeTruthy();
    });

    test('1', () => {
        expect(stringNum('1').isNegative()).toBeFalsy();
    });

    test('-1', () => {
        expect(stringNum('-1').isPositive()).toBeFalsy();
    });

    test('-1', () => {
        expect(stringNum('-1').isNegative()).toBeTruthy();
    });

    test('1', () => {
        expect(stringNum('1').negative().val()).toBe('-1');
    });

    test('-1', () => {
        expect(stringNum('-1').negative().val()).toBe('1');
    });
});

describe('Greater', () => {
    test('both positive', () => {
        expect(stringNum('3').gt(stringNum('1'))).toBeTruthy();
    });

    test('both negative', () => {
        expect(stringNum('-3').gt(stringNum('-1'))).toBeFalsy();
    });

    test('positive > negative', () => {
        expect(stringNum('3').gt(stringNum('-4'))).toBeTruthy();
    });

    test('negative > positive', () => {
        expect(stringNum('-3').gt(stringNum('4'))).toBeFalsy();
    });

});

describe('Decrease', () => {
    test('-3.dec', () => {
        expect(stringNum('-3').dec().val()).toBe('-4');
    })
});