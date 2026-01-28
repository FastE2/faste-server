"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundUserException = exports.EmailAlreadyExistsException = exports.NotFoundRecordSKUException = exports.NotFoundRecordException = void 0;
const common_1 = require("@nestjs/common");
exports.NotFoundRecordException = new common_1.NotFoundException({
    message: 'Error.NotFoundRecord',
});
exports.NotFoundRecordSKUException = new common_1.NotFoundException({
    message: 'Error.NotFoundRecordSKU',
});
exports.EmailAlreadyExistsException = new common_1.ConflictException({
    message: 'Error.EmailAlreadyExists',
    path: 'email',
});
exports.NotFoundUserException = new common_1.NotFoundException({
    message: 'Error.NotFoundUser',
});
//# sourceMappingURL=index.js.map