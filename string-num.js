function stringNum(numStr) {
    return {
        _value: numStr,
        val: function() {
            return this._value;
        },
        bign: function() {
            return BigInt(this._value);
        },
        isNegative: function() {
            return this._value.startsWith("-");
        },
        isPositive: function() {
            return !this.isNegative();
        },
        negative: function() {
            // negative of this
            // if this is already negative, return positive
            // otherwise return negative
            if (this.isNegative()) {
                return this.abs();
            }
            return stringNum(`-${this._value}`);
        },
        abs: function() {
            if (this.isNegative()) {
                return stringNum(this._value.slice(1));
            }
            return this.clone();
        },
        clone: function() {
            return stringNum(this._value);
        },
        inc: function() {
            return this.add(stringNum('1'));
        },
        dec: function() {
            return this.sub(stringNum('1'));
        },
        fib: function() {
            if (this._value === '0') {
                return stringNum('0');
            }
            if (this._value === '1') {
                return stringNum('1');
            }
            
            let fibn;

            if (this.gte(stringNum('1'))) {
                // f(n) = fib(n-2) + fib(n-2)
                // f(1) = 1
                // f(0) = 0
                // f(2) = fib(1) + fib(0)
                // f(3) = fib(2) + fib(1)
                let fibn1 = stringNum('1');
                let fibn2 = stringNum('0');
                for(let i = stringNum('2'); i.lte(this); i = i.inc()) {
                    fibn = fibn1.add(fibn2);
                    fibn2 = fibn1.clone();
                    fibn1 = fibn.clone();
                }
                return fibn;
            }

            // f(n) = fib(n+2) - fib(n+1)
            // f(1) = 1
            // f(0) = 0
            // f(-1) = fib(1) - fib(0)
            // f(-2) = fib(0) - fib(-1)
            let fibnPlus1 = stringNum('0');
            let fibnPlus2 = stringNum('1');
            for(let i = stringNum('-1'); i.gte(this); i = i.dec()) {
                fibn = fibnPlus2.sub(fibnPlus1);
                fibnPlus2 = fibnPlus1.clone();
                fibnPlus1 = fibn.clone();
            }
            return fibn;
        },
        fact: function() {
            let result = stringNum('1');
            for (let i = stringNum('1'); i.lte(this); i = i.inc()) {
                result = result.multiply(i);
            }
            return result;
        },
        add: function(v) {
            if (this.isPositive() && v.isPositive()) {
                const length = Math.max(this.abs().val().length, v.abs().val().length);
                const v1 = this._value.padStart(length, "0").split("").reverse();
                const v2 = v.val().padStart(length, "0").split("").reverse();
                let carry = 0;
                let output = [];
                for(let i = 0; i < v1.length; i++) {
                    const r = Number.parseInt(v1[i], 10) + Number.parseInt(v2[i], 10) + carry;
                    output.push(r % 10);
                    carry = Math.floor(r / 10);
                }
                if (carry) {
                    output.push(carry);
                }
                let s = output.reverse().join("").replace(/^0+/, '');
                if (s.length === 0) {
                    s = '0';
                }
                return stringNum(s);
            }
            if (this.isPositive() && v.isNegative()) {
                return this.sub(v.abs());
            }
            if (this.isNegative() && v.isPositive()) {
                return v.sub(this.abs());
            }
            // both negative
            return v.abs().add(this.abs()).negative();
        },
        sub: function(v) {
            if (this.isPositive() && v.isPositive()) {
                const length = Math.max(this.abs().val().length, v.abs().val().length);
                let negativeResult = false;
                let vGreater = this.clone();
                let vLesser = v.clone();
                if (this.lt(v)) {
                    vGreater = v.abs();
                    vLesser = this.abs();
                    negativeResult = true;
                }

                const v1 = vGreater.val().padStart(length, "0").split("").reverse();
                const v2 = vLesser.val().padStart(length, "0").split("").reverse();
                let output = [];
                let carry = 0;

                for(let i = 0; i < v1.length; i++) {
                    const g = Number.parseInt(v1[i], 10) - carry;
                    const l = Number.parseInt(v2[i], 10);
                    if (g < l) {
                        carry = 1;
                    } else {
                        carry = 0;
                    }
                    const r = g - l + (carry * 10);
                    output.push(r);
                }
                let s = output.reverse().join("").replace(/^0+/, '');
                if (s.length === 0) {
                    s = '0';
                }
                if (negativeResult) {
                    return stringNum(s).negative();
                }
                return stringNum(s);
            }
            if (this.isPositive() && v.isNegative()) {
                return this.abs().add(v.abs());
            }
            if (this.isNegative() && v.isPositive()) {
                return this.abs().add(v.abs()).negative();
            }
            // both negative
            return this.abs().sub(v.abs()).negative();
        },
        multiply: function(v) {
            const v1 = this._value.split("").reverse();
            const v2 = v.val().split("").reverse();

            const cols = [];
            for(let i = 0; i < v2.length; i++) {
                const col = [];
                let carry = 0;
                for(let j = 0; j < v1.length; j++) {
                    const r = Number.parseInt(v1[j], 10) * Number.parseInt(v2[i]) + carry;
                    col.push(r % 10);
                    carry = Math.floor(r / 10);
                }
                if (carry) {
                    col.push(carry);
                }    
                let s = col.reverse().join("").replace(/^0+/, '');
                if (s.length === 0) {
                    s = '0';
                }    
                cols.push(stringNum(s + '0'.repeat(i)));
            }
            let s = cols[0];
            for(let i = 1; i < cols.length; i++) {
                s = s.add(cols[i]);
            }
            return s;
        },
        eq: function(v) {
            return this._value === v.val();
        },
        gt: function(v) {
            // return true if this value is greater than v
            if (this.isPositive() && v.isPositive()) {
                const length = Math.max(this._value.length, v.val().length);
                const v1 = this._value.padStart(length, "0");
                const v2 = v.val().padStart(length, "0");
                return v1 > v2;
            }
            if (this.isPositive() && v.isNegative()) {
                return true;
            }
            if (this.isNegative() && v.isPositive()) {
                return false;
            }
            // both negative
            return this.abs().lt(v.abs());
        },
        gte: function(v) {
            // return true if this value is greater than v
            return this.gt(v) || this.eq(v);
        },
        lt: function(v) {
            // return true if this value is greater than v
            if (this.isPositive() && v.isPositive()) {
                const length = Math.max(this._value.length, v.val().length);
                const v1 = this._value.padStart(length, "0");
                const v2 = v.val().padStart(length, "0");
                return v1 < v2;
            }
            if (this.isPositive() && v.isNegative()) {
                return false;
            }
            if (this.isNegative() && v.isPositive()) {
                return true;
            }
            // both negative
            return this.abs().gt(v.abs());
        },
        lte: function(v) {
            // return true if this value is greater than v
            return this.lt(v) || this.eq(v);
        }
    }
}

module.exports = stringNum;