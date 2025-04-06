-- CreateTable
CREATE TABLE `HourlyEarning` (
    `equipmentModelId` VARCHAR(191) NOT NULL,
    `equipmentStateId` VARCHAR(191) NOT NULL,
    `value` DOUBLE NOT NULL,

    PRIMARY KEY (`equipmentModelId`, `equipmentStateId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HourlyEarning` ADD CONSTRAINT `HourlyEarning_equipmentModelId_fkey` FOREIGN KEY (`equipmentModelId`) REFERENCES `EquipmentModel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HourlyEarning` ADD CONSTRAINT `HourlyEarning_equipmentStateId_fkey` FOREIGN KEY (`equipmentStateId`) REFERENCES `EquipmentState`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
