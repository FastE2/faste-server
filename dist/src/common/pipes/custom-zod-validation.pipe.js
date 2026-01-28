"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomZodValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const nestjs_zod_1 = require("nestjs-zod");
exports.CustomZodValidationPipe = (0, nestjs_zod_1.createZodValidationPipe)({
    createValidationException: (error) => {
        console.log('Error zod pipe', error.errors);
        error.errors.map((err) => {
            console.log(err.path);
        });
        return new common_1.BadRequestException(error.errors.map((err) => {
            return {
                message: err.message,
                code: err.code,
                path: err.path[0],
            };
        }));
    },
});
//# sourceMappingURL=custom-zod-validation.pipe.js.map