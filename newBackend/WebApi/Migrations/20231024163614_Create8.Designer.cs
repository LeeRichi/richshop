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
    [Migration("20231024163614_Create8")]
    partial class Create8
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

            modelBuilder.Entity("Domain.src.Entities.Cart", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("created_at");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("updated_at");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid")
                        .HasColumnName("user_id");

                    b.HasKey("Id")
                        .HasName("pk_carts");

                    b.ToTable("carts", (string)null);
                });

            modelBuilder.Entity("Domain.src.Entities.CartItem", b =>
                {
                    b.Property<Guid>("CartId")
                        .HasColumnType("uuid")
                        .HasColumnName("cart_id");

                    b.Property<Guid>("ProductId")
                        .HasColumnType("uuid")
                        .HasColumnName("product_id");

                    b.Property<int>("Quantity")
                        .HasColumnType("integer")
                        .HasColumnName("quantity");

                    b.HasKey("CartId", "ProductId")
                        .HasName("pk_cart_items");

                    b.HasIndex("ProductId")
                        .HasDatabaseName("ix_cart_items_product_id");

                    b.ToTable("cart_items", (string)null);
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
                    b.Property<int>("Amount")
                        .HasColumnType("integer")
                        .HasColumnName("amount");

                    b.Property<Guid>("OrderId")
                        .HasColumnType("uuid")
                        .HasColumnName("order_id");

                    b.Property<Guid>("ProductId")
                        .HasColumnType("uuid")
                        .HasColumnName("product_id");

                    b.HasIndex("OrderId")
                        .HasDatabaseName("ix_order_products_order_id");

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

                    b.Property<int>("Inventory")
                        .HasColumnType("integer")
                        .HasColumnName("inventory");

                    b.Property<bool>("IsOnSale")
                        .HasColumnType("boolean")
                        .HasColumnName("is_on_sale");

                    b.Property<float>("Price")
                        .HasColumnType("real")
                        .HasColumnName("price");

                    b.Property<int>("Size")
                        .HasColumnType("integer")
                        .HasColumnName("size");

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
                    b.HasOne("Domain.src.Entities.Cart", "Cart")
                        .WithMany("CartItems")
                        .HasForeignKey("CartId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_cart_items_carts_cart_id");

                    b.HasOne("Domain.src.Entities.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_cart_items_products_product_id");

                    b.Navigation("Cart");

                    b.Navigation("Product");
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
                        .WithMany()
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
                        .WithMany("Favorites")
                        .HasForeignKey("UserId")
                        .HasConstraintName("fk_products_users_user_id");
                });

            modelBuilder.Entity("Domain.src.Entities.Cart", b =>
                {
                    b.Navigation("CartItems");
                });

            modelBuilder.Entity("Domain.src.Entities.User", b =>
                {
                    b.Navigation("Favorites");

                    b.Navigation("Orders");
                });
#pragma warning restore 612, 618
        }
    }
}
