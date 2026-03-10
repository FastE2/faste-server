"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchModule = void 0;
const common_1 = require("@nestjs/common");
const elasticsearch_1 = require("@nestjs/elasticsearch");
const microservices_1 = require("@nestjs/microservices");
const validate_env_1 = __importDefault(require("../../common/configs/validate-env"));
const search_service_1 = require("./search.service");
const search_controller_1 = require("./search.controller");
const search_product_service_1 = require("./search-product.service");
let SearchModule = class SearchModule {
};
exports.SearchModule = SearchModule;
exports.SearchModule = SearchModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'SEARCH_SERVICE',
                    transport: microservices_1.Transport.RMQ,
                    options: {
                        urls: [validate_env_1.default.AMQP_URL],
                        queue: 'search_queue',
                        queueOptions: {
                            durable: true,
                        },
                    },
                },
            ]),
            elasticsearch_1.ElasticsearchModule.registerAsync({
                useFactory: () => ({
                    node: validate_env_1.default.ELASTICSEARCH_NODE || 'http://localhost:9200',
                    auth: {
                        apiKey: validate_env_1.default.ELASTICSEARCH_APIKEY,
                    },
                }),
            }),
        ],
        controllers: [search_controller_1.SearchController],
        providers: [search_service_1.SearchService, search_product_service_1.SearchProductService],
    })
], SearchModule);
//# sourceMappingURL=search.module.js.map