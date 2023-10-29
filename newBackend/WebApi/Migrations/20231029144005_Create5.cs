using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Webapi.Migrations
{
    /// <inheritdoc />
    public partial class Create5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_cart_item_product_product_id",
                table: "cart_item");

            migrationBuilder.DropForeignKey(
                name: "fk_cart_item_users_user_id1",
                table: "cart_item");

            migrationBuilder.DropPrimaryKey(
                name: "pk_cart_item",
                table: "cart_item");

            migrationBuilder.DropColumn(
                name: "discriminator",
                table: "cart_item");

            migrationBuilder.RenameTable(
                name: "cart_item",
                newName: "carts");

            migrationBuilder.RenameIndex(
                name: "ix_cart_item_product_id",
                table: "carts",
                newName: "ix_carts_product_id");

            migrationBuilder.AlterColumn<int>(
                name: "quantity",
                table: "carts",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "user_id1",
                table: "carts",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "pk_carts",
                table: "carts",
                columns: new[] { "user_id", "product_id" });

            migrationBuilder.CreateIndex(
                name: "ix_carts_user_id1",
                table: "carts",
                column: "user_id1");

            migrationBuilder.AddForeignKey(
                name: "fk_carts_product_product_id",
                table: "carts",
                column: "product_id",
                principalTable: "product",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_carts_users_user_id",
                table: "carts",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_carts_users_user_id1",
                table: "carts",
                column: "user_id1",
                principalTable: "users",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_carts_product_product_id",
                table: "carts");

            migrationBuilder.DropForeignKey(
                name: "fk_carts_users_user_id",
                table: "carts");

            migrationBuilder.DropForeignKey(
                name: "fk_carts_users_user_id1",
                table: "carts");

            migrationBuilder.DropPrimaryKey(
                name: "pk_carts",
                table: "carts");

            migrationBuilder.DropIndex(
                name: "ix_carts_user_id1",
                table: "carts");

            migrationBuilder.DropColumn(
                name: "user_id1",
                table: "carts");

            migrationBuilder.RenameTable(
                name: "carts",
                newName: "cart_item");

            migrationBuilder.RenameIndex(
                name: "ix_carts_product_id",
                table: "cart_item",
                newName: "ix_cart_item_product_id");

            migrationBuilder.AlterColumn<int>(
                name: "quantity",
                table: "cart_item",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<string>(
                name: "discriminator",
                table: "cart_item",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "pk_cart_item",
                table: "cart_item",
                columns: new[] { "user_id", "product_id" });

            migrationBuilder.AddForeignKey(
                name: "fk_cart_item_product_product_id",
                table: "cart_item",
                column: "product_id",
                principalTable: "product",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_cart_item_users_user_id1",
                table: "cart_item",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
