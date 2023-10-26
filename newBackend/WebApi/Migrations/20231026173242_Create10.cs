using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Webapi.Migrations
{
    /// <inheritdoc />
    public partial class Create10 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_cart_items_products_product_id",
                table: "cart_items");

            migrationBuilder.DropForeignKey(
                name: "fk_order_products_products_product_id",
                table: "order_products");

            migrationBuilder.DropForeignKey(
                name: "fk_products_users_user_id",
                table: "products");

            migrationBuilder.DropIndex(
                name: "ix_order_products_order_id",
                table: "order_products");

            migrationBuilder.DropPrimaryKey(
                name: "pk_products",
                table: "products");

            migrationBuilder.RenameTable(
                name: "products",
                newName: "product");

            migrationBuilder.RenameIndex(
                name: "ix_products_user_id",
                table: "product",
                newName: "ix_product_user_id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_order_products",
                table: "order_products",
                columns: new[] { "order_id", "product_id" });

            migrationBuilder.AddPrimaryKey(
                name: "pk_product",
                table: "product",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_cart_items_product_product_id",
                table: "cart_items",
                column: "product_id",
                principalTable: "product",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_order_products_product_product_id",
                table: "order_products",
                column: "product_id",
                principalTable: "product",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_product_users_user_id",
                table: "product",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_cart_items_product_product_id",
                table: "cart_items");

            migrationBuilder.DropForeignKey(
                name: "fk_order_products_product_product_id",
                table: "order_products");

            migrationBuilder.DropForeignKey(
                name: "fk_product_users_user_id",
                table: "product");

            migrationBuilder.DropPrimaryKey(
                name: "pk_order_products",
                table: "order_products");

            migrationBuilder.DropPrimaryKey(
                name: "pk_product",
                table: "product");

            migrationBuilder.RenameTable(
                name: "product",
                newName: "products");

            migrationBuilder.RenameIndex(
                name: "ix_product_user_id",
                table: "products",
                newName: "ix_products_user_id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_products",
                table: "products",
                column: "id");

            migrationBuilder.CreateIndex(
                name: "ix_order_products_order_id",
                table: "order_products",
                column: "order_id");

            migrationBuilder.AddForeignKey(
                name: "fk_cart_items_products_product_id",
                table: "cart_items",
                column: "product_id",
                principalTable: "products",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_order_products_products_product_id",
                table: "order_products",
                column: "product_id",
                principalTable: "products",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_products_users_user_id",
                table: "products",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id");
        }
    }
}
