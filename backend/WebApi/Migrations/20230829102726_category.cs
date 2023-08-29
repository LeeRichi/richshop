using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    /// <inheritdoc />
    public partial class category : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_order_products_orders_order_id",
                table: "order_products");

            migrationBuilder.DropColumn(
                name: "order_product_id",
                table: "orders");

            migrationBuilder.AddColumn<string>(
                name: "category",
                table: "products",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<Guid>(
                name: "order_id",
                table: "order_products",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "fk_order_products_orders_order_id",
                table: "order_products",
                column: "order_id",
                principalTable: "orders",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_order_products_orders_order_id",
                table: "order_products");

            migrationBuilder.DropColumn(
                name: "category",
                table: "products");

            migrationBuilder.AddColumn<List<Guid>>(
                name: "order_product_id",
                table: "orders",
                type: "uuid[]",
                nullable: false);

            migrationBuilder.AlterColumn<Guid>(
                name: "order_id",
                table: "order_products",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddForeignKey(
                name: "fk_order_products_orders_order_id",
                table: "order_products",
                column: "order_id",
                principalTable: "orders",
                principalColumn: "id");
        }
    }
}
