﻿// <auto-generated />
using System;
using System.Collections.Generic;
using Domain.src.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using WebApi.src.Database;

#nullable disable

namespace Webapi.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20231031130639_Create21")]
    partial class Create21
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.HasPostgresEnum(modelBuilder, "role", new[] { "admin", "user" });
            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Domain.src.Entities.CartItem", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid")
                        .HasColumnName("user_id");

                    b.Property<Guid>("ProductId")
                        .HasColumnType("uuid")
                        .HasColumnName("product_id");

                    b.Property<int>("Quantity")
                        .HasColumnType("integer")
                        .HasColumnName("quantity");

                    b.HasKey("UserId", "ProductId")
                        .HasName("pk_carts");

                    b.HasIndex("ProductId")
                        .HasDatabaseName("ix_carts_product_id");

                    b.ToTable("carts", (string)null);
                });

            modelBuilder.Entity("Domain.src.Entities.Favorite", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid")
                        .HasColumnName("user_id");

                    b.Property<Guid>("ProductId")
                        .HasColumnType("uuid")
                        .HasColumnName("product_id");

                    b.HasKey("UserId", "ProductId")
                        .HasName("pk_favorites");

                    b.HasIndex("ProductId")
                        .HasDatabaseName("ix_favorites_product_id");

                    b.ToTable("favorites", (string)null);
                });

            modelBuilder.Entity("Domain.src.Entities.Order", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("created_at");

                    b.Property<int>("OrderStatus")
                        .HasColumnType("integer")
                        .HasColumnName("order_status");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("updated_at");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid")
                        .HasColumnName("user_id");

                    b.HasKey("Id")
                        .HasName("pk_orders");

                    b.HasIndex("UserId")
                        .HasDatabaseName("ix_orders_user_id");

                    b.ToTable("orders", (string)null);
                });

            modelBuilder.Entity("Domain.src.Entities.OrderProduct", b =>
                {
                    b.Property<Guid>("OrderId")
                        .HasColumnType("uuid")
                        .HasColumnName("order_id");

                    b.Property<Guid>("ProductId")
                        .HasColumnType("uuid")
                        .HasColumnName("product_id");

                    b.Property<int>("Amount")
                        .HasColumnType("integer")
                        .HasColumnName("amount");

                    b.HasKey("OrderId", "ProductId")
                        .HasName("pk_order_products");

                    b.HasIndex("ProductId")
                        .HasDatabaseName("ix_order_products_product_id");

                    b.ToTable("order_products", (string)null);
                });

            modelBuilder.Entity("Domain.src.Entities.Product", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<string>("Brand")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("brand");

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("category");

                    b.Property<int>("Color")
                        .HasColumnType("integer")
                        .HasColumnName("color");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("created_at");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("description");

                    b.Property<List<string>>("Images")
                        .IsRequired()
                        .HasColumnType("text[]")
                        .HasColumnName("images");

                    b.Property<bool>("IsOnSale")
                        .HasColumnType("boolean")
                        .HasColumnName("is_on_sale");

                    b.Property<float>("Price")
                        .HasColumnType("real")
                        .HasColumnName("price");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("title");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("updated_at");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("uuid")
                        .HasColumnName("user_id");

                    b.HasKey("Id")
                        .HasName("pk_products");

                    b.HasIndex("UserId")
                        .HasDatabaseName("ix_products_user_id");

                    b.ToTable("products", (string)null);
                });

            modelBuilder.Entity("Domain.src.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("address");

                    b.Property<string>("Avatar")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("avatar");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("created_at");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("email");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("password");

                    b.Property<Role>("Role")
                        .HasColumnType("role")
                        .HasColumnName("role");

                    b.Property<byte[]>("Salt")
                        .IsRequired()
                        .HasColumnType("bytea")
                        .HasColumnName("salt");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("updated_at");

                    b.HasKey("Id")
                        .HasName("pk_users");

                    b.HasIndex("Email")
                        .IsUnique()
                        .HasDatabaseName("ix_users_email");

                    b.ToTable("users", (string)null);
                });

            modelBuilder.Entity("Domain.src.Entities.CartItem", b =>
                {
                    b.HasOne("Domain.src.Entities.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_carts_products_product_id");

                    b.HasOne("Domain.src.Entities.User", "User")
                        .WithMany("Carts")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_carts_users_user_id");

                    b.Navigation("Product");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.src.Entities.Favorite", b =>
                {
                    b.HasOne("Domain.src.Entities.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_favorites_products_product_id");

                    b.HasOne("Domain.src.Entities.User", "User")
                        .WithMany("Favorites")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_favorites_users_user_id");

                    b.Navigation("Product");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.src.Entities.Order", b =>
                {
                    b.HasOne("Domain.src.Entities.User", "User")
                        .WithMany("Orders")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_orders_users_user_id");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.src.Entities.OrderProduct", b =>
                {
                    b.HasOne("Domain.src.Entities.Order", "Order")
                        .WithMany("OrderProducts")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_order_products_orders_order_id");

                    b.HasOne("Domain.src.Entities.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_order_products_products_product_id");

                    b.Navigation("Order");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("Domain.src.Entities.Product", b =>
                {
                    b.HasOne("Domain.src.Entities.User", null)
                        .WithMany("BrowseHistory")
                        .HasForeignKey("UserId")
                        .HasConstraintName("fk_products_users_user_id");

                    b.OwnsOne("System.Collections.Generic.Dictionary<Domain.src.Entities.Size, int>", "Inventory", b1 =>
                        {
                            b1.Property<Guid>("ProductId")
                                .HasColumnType("uuid")
                                .HasColumnName("id");

                            b1.Property<int>("L")
                                .HasColumnType("integer")
                                .HasColumnName("inventory_l");

                            b1.Property<int>("M")
                                .HasColumnType("integer")
                                .HasColumnName("inventory_m");

                            b1.Property<int>("S")
                                .HasColumnType("integer")
                                .HasColumnName("inventory_s");

                            b1.Property<int>("XL")
                                .HasColumnType("integer")
                                .HasColumnName("inventory_xl");

                            b1.HasKey("ProductId");

                            b1.ToTable("products");

                            b1.WithOwner()
                                .HasForeignKey("ProductId")
                                .HasConstraintName("fk_products_products_id");
                        });

                    b.Navigation("Inventory")
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.src.Entities.Order", b =>
                {
                    b.Navigation("OrderProducts");
                });

            modelBuilder.Entity("Domain.src.Entities.User", b =>
                {
                    b.Navigation("BrowseHistory");

                    b.Navigation("Carts");

                    b.Navigation("Favorites");

                    b.Navigation("Orders");
                });
#pragma warning restore 612, 618
        }
    }
}
