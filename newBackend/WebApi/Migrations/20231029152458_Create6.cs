using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Webapi.Migrations
{
    /// <inheritdoc />
    public partial class Create6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_carts_users_user_id1",
                table: "carts");

            migrationBuilder.DropIndex(
                name: "ix_carts_user_id1",
                table: "carts");

            migrationBuilder.DropColumn(
                name: "user_id1",
                table: "carts");

            migrationBuilder.AddColumn<Guid>(
                name: "user_id1",
                table: "product",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "ix_product_user_id1",
                table: "product",
                column: "user_id1");

            migrationBuilder.AddForeignKey(
                name: "fk_product_users_user_id1",
                table: "product",
                column: "user_id1",
                principalTable: "users",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_product_users_user_id1",
                table: "product");

            migrationBuilder.DropIndex(
                name: "ix_product_user_id1",
                table: "product");

            migrationBuilder.DropColumn(
                name: "user_id1",
                table: "product");

            migrationBuilder.AddColumn<Guid>(
                name: "user_id1",
                table: "carts",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "ix_carts_user_id1",
                table: "carts",
                column: "user_id1");

            migrationBuilder.AddForeignKey(
                name: "fk_carts_users_user_id1",
                table: "carts",
                column: "user_id1",
                principalTable: "users",
                principalColumn: "id");
        }
    }
}
