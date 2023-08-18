using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    /// <inheritdoc />
    public partial class create2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_images_products_product_id",
                table: "images");

            migrationBuilder.DropPrimaryKey(
                name: "pk_images",
                table: "images");

            migrationBuilder.RenameTable(
                name: "images",
                newName: "image");

            migrationBuilder.RenameIndex(
                name: "ix_images_product_id",
                table: "image",
                newName: "ix_image_product_id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_image",
                table: "image",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_image_products_product_id",
                table: "image",
                column: "product_id",
                principalTable: "products",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_image_products_product_id",
                table: "image");

            migrationBuilder.DropPrimaryKey(
                name: "pk_image",
                table: "image");

            migrationBuilder.RenameTable(
                name: "image",
                newName: "images");

            migrationBuilder.RenameIndex(
                name: "ix_image_product_id",
                table: "images",
                newName: "ix_images_product_id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_images",
                table: "images",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_images_products_product_id",
                table: "images",
                column: "product_id",
                principalTable: "products",
                principalColumn: "id");
        }
    }
}
