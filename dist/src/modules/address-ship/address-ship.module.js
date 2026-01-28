"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressShipModule = void 0;
const common_1 = require("@nestjs/common");
const address_ship_controller_1 = require("./address-ship.controller");
const address_ship_service_1 = require("./address-ship.service");
const address_ship_repository_1 = require("./address-ship.repository");
let AddressShipModule = class AddressShipModule {
};
exports.AddressShipModule = AddressShipModule;
exports.AddressShipModule = AddressShipModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [address_ship_controller_1.AddressShipController],
        providers: [address_ship_service_1.AddressShipService, address_ship_repository_1.AddressShipRepository],
    })
], AddressShipModule);
//# sourceMappingURL=address-ship.module.js.map