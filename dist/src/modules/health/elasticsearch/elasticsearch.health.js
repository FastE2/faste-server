"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticsearchHealthIndicator = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const elasticsearch_1 = require("@nestjs/elasticsearch");
let ElasticsearchHealthIndicator = class ElasticsearchHealthIndicator extends terminus_1.HealthIndicator {
    es;
    constructor(es) {
        super();
        this.es = es;
    }
    async isHealthy(key = 'elasticsearch') {
        try {
            await this.es.ping();
            return this.getStatus(key, true);
        }
        catch (error) {
            throw new terminus_1.HealthCheckError('Elasticsearch check failed', this.getStatus(key, false));
        }
    }
};
exports.ElasticsearchHealthIndicator = ElasticsearchHealthIndicator;
exports.ElasticsearchHealthIndicator = ElasticsearchHealthIndicator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [elasticsearch_1.ElasticsearchService])
], ElasticsearchHealthIndicator);
//# sourceMappingURL=elasticsearch.health.js.map