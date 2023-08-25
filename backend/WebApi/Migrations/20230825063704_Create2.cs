using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    /// <inheritdoc />
    public partial class Create2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "pk_order_products",
                table: "order_products");

            migrationBuilder.AddPrimaryKey(
                name: "pk_order_products",
                table: "order_products",
                column: "id");

            migrationBuilder.CreateIndex(
                name: "ix_order_products_product_id",
                table: "order_products",
                column: "product_id");

            migrationBuilder.AddForeignKey(
                name: "fk_order_products_products_product_id",
                table: "order_products",
                column: "product_id",
                principalTable: "products",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_order_products_products_product_id",
                table: "order_products");

            migrationBuilder.DropPrimaryKey(
                name: "pk_order_products",
                table: "order_products");

            migrationBuilder.DropIndex(
                name: "ix_order_products_product_id",
                table: "order_products");

            migrationBuilder.AddPrimaryKey(
                name: "pk_order_products",
                table: "order_products",
                column: "product_id");
        }
    }
}
