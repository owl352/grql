"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerData = exports.gymData = exports.trainingData = void 0;
// Модель тренировок
exports.trainingData = [
    { id: 1, type: "индивидуальная", price: 50, gymId: 1 },
    { id: 2, type: "групповая", price: 30, gymId: 2 },
    { id: 3, type: "с тренером", price: 100, gymId: 1 },
];
// Модель филиалов (залов)
exports.gymData = [
    {
        id: 1,
        name: "Зал 1",
        adminName: "Администратор 1",
        adminPhone: "123-456-7890",
        availableSlots: 10,
    },
    {
        id: 2,
        name: "Зал 2",
        adminName: "Администратор 2",
        adminPhone: "987-654-3210",
        availableSlots: 15,
    },
];
// Модель покупателей
exports.customerData = [
    { id: 1, name: "Клиент 1", email: "client1@example.com" },
    { id: 2, name: "Клиент 2", email: "client2@example.com" },
];
// Модель тренировок
const purchaseData = [
    { id: 1, trainingId: 1, customerId: 1, price: 50, gymIncome: 30 },
    { id: 2, trainingId: 2, customerId: 2, price: 30, gymIncome: 25 },
    { id: 3, trainingId: 3, customerId: 1, price: 100, gymIncome: 80 },
];
