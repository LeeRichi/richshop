using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Webapi.Migrations
{
    /// <inheritdoc />
    public partial class Create21 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "size",
                table: "products",
                newName: "inventory_xl");

            migrationBuilder.RenameColumn(
                name: "inventory",
                table: "products",
                newName: "inventory_s");

            migrationBuilder.AddColumn<int>(
                name: "inventory_l",
                table: "products",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "inventory_m",
                table: "products",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "inventory_l",
                table: "products");

            migrationBuilder.DropColumn(
                name: "inventory_m",
                table: "products");

            migrationBuilder.RenameColumn(
                name: "inventory_xl",
                table: "products",
                newName: "size");

            migrationBuilder.RenameColumn(
                name: "inventory_s",
                table: "products",
                newName: "inventory");
        }
    }
}
