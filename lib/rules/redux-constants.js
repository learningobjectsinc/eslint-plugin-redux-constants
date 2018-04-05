'use strict';

const snakeScream = /^[A-Z_]+$/;

module.exports = {
  meta: {
    docs: {
      description: "enforce that redux action values equal their identifiers, and other sundries",
      category: "Possible Errors",
      recommended: true,
    },
    //fixable: "code",
    schema: [],
  },
  create: function(context) {
    return {
      "VariableDeclarator": function (vd) {
        const isIdent = vd.id.type === 'Identifier';
        const isLitString =
          !!vd.init
            && vd.init.type === 'Literal'
            && (typeof vd.init.value === 'string');
        if (isIdent && isLitString) {
          const idMatch = snakeScream.exec(vd.id.name);
          const valMatch = snakeScream.exec(vd.init.value);
          if (!!idMatch && !!valMatch) {
            /* here it's probably the case that we're a redux action constant definition */
            if (vd.id.name !== vd.init.value) {
              context.report({
                node: vd,
                message: "action constant mismatch: expected {{identifier}}; got {{value}}",
                messageId: 'actionConstantMismatch',
                data: {
                  identifier: vd.id.name,
                  value: vd.init.value,
                }
              });
            }
            if (vd.parent.kind !== 'const') {
              context.report({
                node: vd,
                message: "action constant declared with {{kind}} (use const instead!)",
                data: {
                  kind: vd.parent.kind,
                }
              });
            }
          }
        }
      }
    }
  },
};

