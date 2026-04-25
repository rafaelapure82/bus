-- CreateTable
CREATE TABLE "abouts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "abouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounthead" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "parentid" TEXT,
    "chield" INTEGER,

    CONSTRAINT "accounthead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "detail" TEXT,
    "amount" TEXT NOT NULL,
    "doc_location" TEXT,
    "system_user_id" INTEGER,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adds" (
    "id" SERIAL NOT NULL,
    "image_path" TEXT NOT NULL,
    "pagename" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "adds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agentcommissions" (
    "id" SERIAL NOT NULL,
    "agent_id" INTEGER NOT NULL,
    "booking_id" TEXT NOT NULL,
    "subtrip_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "grandtotal" TEXT NOT NULL,
    "commission" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "agentcommissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agents" (
    "id" SERIAL NOT NULL,
    "location_id" INTEGER NOT NULL,
    "country_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "blood" TEXT,
    "id_number" TEXT,
    "id_type" TEXT,
    "nid_picture" TEXT,
    "commission" TEXT NOT NULL,
    "profile_picture" TEXT,
    "address" TEXT NOT NULL,
    "city" TEXT,
    "zip" TEXT,
    "discount" DOUBLE PRECISION DEFAULT 0,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "agents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agenttotals" (
    "id" SERIAL NOT NULL,
    "agent_id" INTEGER NOT NULL,
    "booking_id" TEXT,
    "income" TEXT,
    "expense" TEXT,
    "detail" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "agenttotals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "serial" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blogs" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "serial" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cancels" (
    "id" SERIAL NOT NULL,
    "booking_id" TEXT NOT NULL,
    "cancel_fee" TEXT,
    "pay_type_id" TEXT,
    "track_table_id" TEXT,
    "type" TEXT NOT NULL,
    "detail" TEXT,
    "cancel_by" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "cancels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cookes" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "cookes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country" (
    "id" SERIAL NOT NULL,
    "iso" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nicename" TEXT NOT NULL,
    "iso3" TEXT,
    "numcode" INTEGER,
    "phonecode" INTEGER NOT NULL,

    CONSTRAINT "country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupondiscounts" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "coupon_id" INTEGER NOT NULL,
    "booking_id" TEXT NOT NULL,
    "subtrip_id" INTEGER NOT NULL,
    "amount" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "coupondiscounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupons" (
    "id" SERIAL NOT NULL,
    "subtrip_id" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "discount" TEXT NOT NULL,
    "condition" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "currencies" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "minor_unit" INTEGER NOT NULL,
    "symbol" TEXT NOT NULL,

    CONSTRAINT "currencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emails" (
    "id" SERIAL NOT NULL,
    "protocol" TEXT NOT NULL,
    "smtphost" TEXT NOT NULL,
    "smtpuser" TEXT NOT NULL,
    "smtppass" TEXT NOT NULL,
    "smtpport" TEXT NOT NULL,
    "smtpcrypto" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "emails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "employeetype_id" INTEGER NOT NULL,
    "country_id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "blood" TEXT NOT NULL,
    "id_type" TEXT,
    "nid" TEXT,
    "nid_picture" TEXT NOT NULL,
    "profile_picture" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employeetypes" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "employeetypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facilitys" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "facilitys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faqquestions" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "faqquestions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faqs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fitnesses" (
    "id" SERIAL NOT NULL,
    "vehicle_id" INTEGER NOT NULL,
    "fitness_name" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "start_milage" TEXT NOT NULL,
    "end_milage" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "fitnesses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fleets" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "layout" TEXT NOT NULL,
    "last_seat" TEXT NOT NULL,
    "total_seat" INTEGER NOT NULL,
    "seat_number" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "luggage_service" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "fleets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flutterwaves" (
    "id" SERIAL NOT NULL,
    "live_public_key" TEXT NOT NULL,
    "live_secret_key" TEXT NOT NULL,
    "live_encryption_key" TEXT NOT NULL,
    "test_public_key" TEXT NOT NULL,
    "test_secret_key" TEXT NOT NULL,
    "test_encryption_key" TEXT NOT NULL,
    "environment" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "flutterwaves_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fonts" (
    "id" SERIAL NOT NULL,
    "font_name" TEXT NOT NULL,
    "font_display" TEXT NOT NULL,

    CONSTRAINT "fonts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "footers" (
    "id" SERIAL NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "opentime" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "footers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gatewaytotals" (
    "id" SERIAL NOT NULL,
    "booking_id" TEXT NOT NULL,
    "gateway_id" INTEGER NOT NULL,
    "amount" TEXT NOT NULL,
    "detail" TEXT,
    "trip_id" INTEGER NOT NULL,
    "subtrip_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "gatewaytotals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inquiries" (
    "id" SERIAL NOT NULL,
    "mobile" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journeylists" (
    "id" SERIAL NOT NULL,
    "booking_id" TEXT NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "subtrip_id" INTEGER NOT NULL,
    "pick_location_id" INTEGER NOT NULL,
    "drop_location_id" INTEGER NOT NULL,
    "pick_stand_id" INTEGER NOT NULL,
    "drop_stand_id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" TEXT,
    "journeydate" TEXT NOT NULL,
    "id_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "journeylists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "langstrings" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "langstrings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "languages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lngcode" TEXT NOT NULL,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lngstngvalues" (
    "id" SERIAL NOT NULL,
    "string_id" INTEGER NOT NULL,
    "localize_id" INTEGER NOT NULL,
    "value" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "lngstngvalues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "localizes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "language_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "localizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maxtimes" (
    "id" SERIAL NOT NULL,
    "maxtime" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "maxtimes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menus" (
    "id" SERIAL NOT NULL,
    "menu_title" TEXT NOT NULL,
    "page_url" TEXT NOT NULL,
    "module_name" TEXT NOT NULL,
    "parent_menu_id" TEXT,
    "have_chield" TEXT,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "migrations" (
    "id" BIGSERIAL NOT NULL,
    "version" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "namespace" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "batch" INTEGER NOT NULL,

    CONSTRAINT "migrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partialpaids" (
    "id" SERIAL NOT NULL,
    "booking_id" TEXT NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "subtrip_id" INTEGER NOT NULL,
    "passanger_id" INTEGER NOT NULL,
    "paidamount" TEXT NOT NULL,
    "pay_type_id" INTEGER,
    "pay_method_id" INTEGER,
    "payment_detail" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "partialpaids_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payagents" (
    "id" SERIAL NOT NULL,
    "agent_id" INTEGER NOT NULL,
    "amount" TEXT,
    "status" TEXT,
    "approved_id" INTEGER,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "payagents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paymentgateways" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "paymentgateways_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paymethods" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "paymethods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paymethodtotals" (
    "id" SERIAL NOT NULL,
    "booking_id" TEXT NOT NULL,
    "paymethod_id" INTEGER NOT NULL,
    "amount" TEXT NOT NULL,
    "detail" TEXT,
    "trip_id" INTEGER NOT NULL,
    "subtrip_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "paymethodtotals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paypals" (
    "id" SERIAL NOT NULL,
    "test_c_kye" TEXT NOT NULL,
    "test_s_kye" TEXT NOT NULL,
    "live_c_kye" TEXT NOT NULL,
    "live_s_kye" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "marchantid" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "paypals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paystacks" (
    "id" SERIAL NOT NULL,
    "test_p_kye" TEXT NOT NULL,
    "test_s_kye" TEXT NOT NULL,
    "live_p_kye" TEXT NOT NULL,
    "live_s_kye" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "paystacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" SERIAL NOT NULL,
    "role_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "menu_title" TEXT,
    "create" TEXT,
    "read" TEXT,
    "edit" TEXT,
    "delete" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pickdrops" (
    "id" SERIAL NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "stand_id" INTEGER NOT NULL,
    "time" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "detail" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "pickdrops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "privacies" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "privacies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ratings" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "subtrip_id" INTEGER NOT NULL,
    "booking_id" TEXT NOT NULL,
    "comments" TEXT,
    "rating" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "razors" (
    "id" SERIAL NOT NULL,
    "test_s_kye" TEXT NOT NULL,
    "live_s_kye" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "razors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refunds" (
    "id" SERIAL NOT NULL,
    "booking_id" TEXT NOT NULL,
    "refund_fee" TEXT,
    "pay_type_id" TEXT,
    "track_table_id" TEXT,
    "type" TEXT NOT NULL,
    "detail" TEXT,
    "refund_by" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "refunds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roundtripdiscounds" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "discountrate" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "roundtripdiscounds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedulefilters" (
    "id" SERIAL NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "detail" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "schedulefilters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedules" (
    "id" SERIAL NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section_five_app" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "button_one_status" INTEGER NOT NULL,
    "button_one_link" TEXT NOT NULL,
    "button_two_status" INTEGER NOT NULL,
    "button_two_link" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "section_five_app_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section_four_comment" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "section_four_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section_four_detail" (
    "id" SERIAL NOT NULL,
    "person_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "person_detail" TEXT NOT NULL,
    "image" TEXT,
    "serial" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "section_four_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section_one_home" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "button_text" TEXT NOT NULL,
    "image" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "section_one_home_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section_seven_subscrib" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "section_seven_subscrib_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section_six_blog" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "section_six_blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section_three_heading" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "section_three_heading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section_two_detail" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "button_text" TEXT NOT NULL,
    "image" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "section_two_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section_two_work_flow" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "section_two_work_flow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "serial" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "social_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "socialmedias" (
    "id" SERIAL NOT NULL,
    "image_path" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "socialmedias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "socialsignins" (
    "id" SERIAL NOT NULL,
    "appid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "other" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "socialsignins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ssl_commerz" (
    "id" SERIAL NOT NULL,
    "ssl_store_id" TEXT NOT NULL,
    "ssl_store_password" TEXT NOT NULL,
    "environment" INTEGER NOT NULL,

    CONSTRAINT "ssl_commerz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stands" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "stands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stripes" (
    "id" SERIAL NOT NULL,
    "test_p_kye" TEXT NOT NULL,
    "test_s_kye" TEXT NOT NULL,
    "live_p_kye" TEXT NOT NULL,
    "live_s_kye" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "stripes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stuffassigns" (
    "id" SERIAL NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "employee_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "stuffassigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscribes" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "subscribes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subtrips" (
    "id" SERIAL NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "pick_location_id" INTEGER NOT NULL,
    "drop_location_id" INTEGER NOT NULL,
    "stoppage" TEXT,
    "adult_fair" TEXT NOT NULL,
    "child_fair" TEXT,
    "special_fair" TEXT,
    "type" TEXT NOT NULL,
    "show" TEXT,
    "imglocation" TEXT,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "subtrips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taxes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tax_reg" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "taxes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "temporarybooks" (
    "id" SERIAL NOT NULL,
    "subtrip_id" INTEGER NOT NULL,
    "ticket_token" TEXT NOT NULL,
    "seat_names" TEXT NOT NULL,
    "journey_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "temporarybooks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "terms" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "terms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" SERIAL NOT NULL,
    "booking_id" TEXT NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "subtrip_id" INTEGER NOT NULL,
    "passanger_id" INTEGER NOT NULL,
    "pick_location_id" INTEGER NOT NULL,
    "drop_location_id" INTEGER NOT NULL,
    "pick_stand_id" INTEGER NOT NULL,
    "drop_stand_id" INTEGER NOT NULL,
    "price" TEXT NOT NULL,
    "discount" TEXT,
    "roundtrip_discount" TEXT,
    "totaltax" TEXT,
    "paidamount" TEXT NOT NULL,
    "offerer" TEXT,
    "adult" TEXT,
    "chield" TEXT,
    "special" TEXT,
    "seatnumber" TEXT NOT NULL,
    "totalseat" TEXT NOT NULL,
    "refund" TEXT,
    "bookby_user_id" INTEGER NOT NULL,
    "bookby_user_type" TEXT,
    "journeydata" TIMESTAMP(3) NOT NULL,
    "pay_type_id" INTEGER,
    "pay_method_id" INTEGER,
    "payment_status" TEXT NOT NULL,
    "vehicle_id" INTEGER NOT NULL,
    "payment_detail" TEXT,
    "cancel_status" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timezone" (
    "id" SERIAL NOT NULL,
    "country_code" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "gmt_offset" DOUBLE PRECISION,
    "dst_offset" DOUBLE PRECISION,
    "raw_offset" DOUBLE PRECISION,

    CONSTRAINT "timezone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trips" (
    "id" SERIAL NOT NULL,
    "fleet_id" INTEGER NOT NULL,
    "schedule_id" INTEGER NOT NULL,
    "pick_location_id" INTEGER NOT NULL,
    "drop_location_id" INTEGER NOT NULL,
    "vehicle_id" INTEGER NOT NULL,
    "distance" TEXT,
    "startdate" TIMESTAMP(3) NOT NULL,
    "journey_hour" TEXT,
    "child_seat" TEXT,
    "special_seat" TEXT NOT NULL,
    "adult_fair" TEXT NOT NULL,
    "child_fair" TEXT,
    "special_fair" TEXT,
    "weekend" TEXT,
    "company_name" TEXT NOT NULL,
    "stoppage" TEXT,
    "facility" TEXT,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "trips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "login_email" TEXT NOT NULL,
    "login_mobile" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "recovery_code" TEXT,
    "last_login" TEXT NOT NULL,
    "ip" TEXT,
    "role" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_detail" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "id_number" TEXT NOT NULL,
    "id_type" TEXT NOT NULL,
    "image" TEXT,
    "address" TEXT,
    "country" INTEGER NOT NULL,
    "city" TEXT,
    "zip_code" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "user_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_details" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "id_number" TEXT,
    "id_type" TEXT,
    "image" TEXT,
    "address" TEXT,
    "country_id" INTEGER NOT NULL,
    "city" TEXT,
    "zip_code" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "user_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "login_email" TEXT NOT NULL,
    "login_mobile" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "recovery_code" TEXT,
    "slug" TEXT NOT NULL,
    "last_login" TIMESTAMP(3),
    "ip" TEXT,
    "role_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicalimages" (
    "id" SERIAL NOT NULL,
    "vehicle_id" INTEGER NOT NULL,
    "img_path" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "vehicalimages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" SERIAL NOT NULL,
    "reg_no" TEXT NOT NULL,
    "fleet_id" INTEGER NOT NULL,
    "engine_no" TEXT NOT NULL,
    "model_no" TEXT NOT NULL,
    "chasis_no" TEXT NOT NULL,
    "woner" TEXT NOT NULL,
    "woner_mobile" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "assign" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "websettings" (
    "id" SERIAL NOT NULL,
    "localize_name" TEXT NOT NULL,
    "headerlogo" TEXT NOT NULL,
    "favicon" TEXT NOT NULL,
    "footerlogo" TEXT NOT NULL,
    "logotext" TEXT NOT NULL,
    "apptitle" TEXT NOT NULL,
    "copyright" TEXT NOT NULL,
    "headercolor" TEXT NOT NULL,
    "footercolor" TEXT NOT NULL,
    "bottomfootercolor" TEXT NOT NULL,
    "buttoncolor" TEXT NOT NULL,
    "buttoncolorhover" TEXT NOT NULL,
    "buttontextcolor" TEXT NOT NULL,
    "fontfamely" TEXT NOT NULL,
    "tax_type" TEXT NOT NULL,
    "country" INTEGER,
    "timezone" TEXT,
    "max_ticket" INTEGER NOT NULL,
    "currency" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "websettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "agentcommissions_agent_id_idx" ON "agentcommissions"("agent_id");

-- CreateIndex
CREATE INDEX "agentcommissions_subtrip_id_idx" ON "agentcommissions"("subtrip_id");

-- CreateIndex
CREATE INDEX "agentcommissions_user_id_idx" ON "agentcommissions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "agents_id_number_key" ON "agents"("id_number");

-- CreateIndex
CREATE INDEX "agents_country_id_idx" ON "agents"("country_id");

-- CreateIndex
CREATE INDEX "agents_location_id_idx" ON "agents"("location_id");

-- CreateIndex
CREATE INDEX "agents_user_id_idx" ON "agents"("user_id");

-- CreateIndex
CREATE INDEX "agenttotals_agent_id_idx" ON "agenttotals"("agent_id");

-- CreateIndex
CREATE INDEX "blog_user_id_idx" ON "blog"("user_id");

-- CreateIndex
CREATE INDEX "blogs_user_id_idx" ON "blogs"("user_id");

-- CreateIndex
CREATE INDEX "cancels_cancel_by_idx" ON "cancels"("cancel_by");

-- CreateIndex
CREATE INDEX "coupondiscounts_coupon_id_idx" ON "coupondiscounts"("coupon_id");

-- CreateIndex
CREATE INDEX "coupondiscounts_subtrip_id_idx" ON "coupondiscounts"("subtrip_id");

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");

-- CreateIndex
CREATE UNIQUE INDEX "employees_nid_key" ON "employees"("nid");

-- CreateIndex
CREATE INDEX "employees_country_id_idx" ON "employees"("country_id");

-- CreateIndex
CREATE INDEX "employees_employeetype_id_idx" ON "employees"("employeetype_id");

-- CreateIndex
CREATE INDEX "gatewaytotals_gateway_id_idx" ON "gatewaytotals"("gateway_id");

-- CreateIndex
CREATE INDEX "gatewaytotals_subtrip_id_idx" ON "gatewaytotals"("subtrip_id");

-- CreateIndex
CREATE INDEX "gatewaytotals_trip_id_idx" ON "gatewaytotals"("trip_id");

-- CreateIndex
CREATE INDEX "gatewaytotals_user_id_idx" ON "gatewaytotals"("user_id");

-- CreateIndex
CREATE INDEX "journeylists_drop_location_id_idx" ON "journeylists"("drop_location_id");

-- CreateIndex
CREATE INDEX "journeylists_drop_stand_id_idx" ON "journeylists"("drop_stand_id");

-- CreateIndex
CREATE INDEX "journeylists_pick_location_id_idx" ON "journeylists"("pick_location_id");

-- CreateIndex
CREATE INDEX "journeylists_pick_stand_id_idx" ON "journeylists"("pick_stand_id");

-- CreateIndex
CREATE INDEX "journeylists_subtrip_id_idx" ON "journeylists"("subtrip_id");

-- CreateIndex
CREATE INDEX "journeylists_trip_id_idx" ON "journeylists"("trip_id");

-- CreateIndex
CREATE UNIQUE INDEX "langstrings_name_key" ON "langstrings"("name");

-- CreateIndex
CREATE INDEX "lngstngvalues_localize_id_idx" ON "lngstngvalues"("localize_id");

-- CreateIndex
CREATE INDEX "lngstngvalues_string_id_idx" ON "lngstngvalues"("string_id");

-- CreateIndex
CREATE INDEX "partialpaids_passanger_id_idx" ON "partialpaids"("passanger_id");

-- CreateIndex
CREATE INDEX "partialpaids_subtrip_id_idx" ON "partialpaids"("subtrip_id");

-- CreateIndex
CREATE INDEX "partialpaids_trip_id_idx" ON "partialpaids"("trip_id");

-- CreateIndex
CREATE INDEX "payagents_agent_id_idx" ON "payagents"("agent_id");

-- CreateIndex
CREATE INDEX "paymethodtotals_paymethod_id_idx" ON "paymethodtotals"("paymethod_id");

-- CreateIndex
CREATE INDEX "paymethodtotals_subtrip_id_idx" ON "paymethodtotals"("subtrip_id");

-- CreateIndex
CREATE INDEX "paymethodtotals_trip_id_idx" ON "paymethodtotals"("trip_id");

-- CreateIndex
CREATE INDEX "paymethodtotals_user_id_idx" ON "paymethodtotals"("user_id");

-- CreateIndex
CREATE INDEX "permissions_menu_id_idx" ON "permissions"("menu_id");

-- CreateIndex
CREATE INDEX "permissions_role_id_idx" ON "permissions"("role_id");

-- CreateIndex
CREATE INDEX "permissions_user_id_idx" ON "permissions"("user_id");

-- CreateIndex
CREATE INDEX "pickdrops_stand_id_idx" ON "pickdrops"("stand_id");

-- CreateIndex
CREATE INDEX "pickdrops_trip_id_idx" ON "pickdrops"("trip_id");

-- CreateIndex
CREATE UNIQUE INDEX "ratings_booking_id_key" ON "ratings"("booking_id");

-- CreateIndex
CREATE INDEX "ratings_subtrip_id_idx" ON "ratings"("subtrip_id");

-- CreateIndex
CREATE INDEX "ratings_trip_id_idx" ON "ratings"("trip_id");

-- CreateIndex
CREATE INDEX "ratings_user_id_idx" ON "ratings"("user_id");

-- CreateIndex
CREATE INDEX "refunds_refund_by_idx" ON "refunds"("refund_by");

-- CreateIndex
CREATE INDEX "stuffassigns_employee_id_idx" ON "stuffassigns"("employee_id");

-- CreateIndex
CREATE INDEX "stuffassigns_trip_id_idx" ON "stuffassigns"("trip_id");

-- CreateIndex
CREATE INDEX "subtrips_trip_id_idx" ON "subtrips"("trip_id");

-- CreateIndex
CREATE INDEX "temporarybooks_subtrip_id_idx" ON "temporarybooks"("subtrip_id");

-- CreateIndex
CREATE UNIQUE INDEX "tickets_booking_id_key" ON "tickets"("booking_id");

-- CreateIndex
CREATE INDEX "tickets_bookby_user_id_idx" ON "tickets"("bookby_user_id");

-- CreateIndex
CREATE INDEX "tickets_drop_location_id_idx" ON "tickets"("drop_location_id");

-- CreateIndex
CREATE INDEX "tickets_drop_stand_id_idx" ON "tickets"("drop_stand_id");

-- CreateIndex
CREATE INDEX "tickets_passanger_id_idx" ON "tickets"("passanger_id");

-- CreateIndex
CREATE INDEX "tickets_pick_location_id_idx" ON "tickets"("pick_location_id");

-- CreateIndex
CREATE INDEX "tickets_pick_stand_id_idx" ON "tickets"("pick_stand_id");

-- CreateIndex
CREATE INDEX "tickets_subtrip_id_idx" ON "tickets"("subtrip_id");

-- CreateIndex
CREATE INDEX "tickets_trip_id_idx" ON "tickets"("trip_id");

-- CreateIndex
CREATE INDEX "tickets_vehicle_id_idx" ON "tickets"("vehicle_id");

-- CreateIndex
CREATE INDEX "trips_drop_location_id_idx" ON "trips"("drop_location_id");

-- CreateIndex
CREATE INDEX "trips_fleet_id_idx" ON "trips"("fleet_id");

-- CreateIndex
CREATE INDEX "trips_pick_location_id_idx" ON "trips"("pick_location_id");

-- CreateIndex
CREATE INDEX "trips_schedule_id_idx" ON "trips"("schedule_id");

-- CreateIndex
CREATE INDEX "trips_vehicle_id_idx" ON "trips"("vehicle_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_login_email_key" ON "user"("login_email");

-- CreateIndex
CREATE UNIQUE INDEX "user_login_mobile_key" ON "user"("login_mobile");

-- CreateIndex
CREATE UNIQUE INDEX "user_slug_key" ON "user"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "user_detail_id_number_key" ON "user_detail"("id_number");

-- CreateIndex
CREATE INDEX "user_detail_user_id_idx" ON "user_detail"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_details_id_number_key" ON "user_details"("id_number");

-- CreateIndex
CREATE INDEX "user_details_user_id_idx" ON "user_details"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_login_email_key" ON "users"("login_email");

-- CreateIndex
CREATE UNIQUE INDEX "users_slug_key" ON "users"("slug");

-- CreateIndex
CREATE INDEX "users_role_id_idx" ON "users"("role_id");

-- CreateIndex
CREATE INDEX "vehicalimages_vehicle_id_idx" ON "vehicalimages"("vehicle_id");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_reg_no_key" ON "vehicles"("reg_no");

-- CreateIndex
CREATE INDEX "vehicles_fleet_id_idx" ON "vehicles"("fleet_id");

-- AddForeignKey
ALTER TABLE "agentcommissions" ADD CONSTRAINT "agentcommissions_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "agents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agentcommissions" ADD CONSTRAINT "agentcommissions_subtrip_id_fkey" FOREIGN KEY ("subtrip_id") REFERENCES "subtrips"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agentcommissions" ADD CONSTRAINT "agentcommissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agents" ADD CONSTRAINT "agents_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agents" ADD CONSTRAINT "agents_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agents" ADD CONSTRAINT "agents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agenttotals" ADD CONSTRAINT "agenttotals_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "agents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "blog" ADD CONSTRAINT "blog_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cancels" ADD CONSTRAINT "cancels_cancel_by_fkey" FOREIGN KEY ("cancel_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "coupondiscounts" ADD CONSTRAINT "coupondiscounts_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "coupons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "coupondiscounts" ADD CONSTRAINT "coupondiscounts_subtrip_id_fkey" FOREIGN KEY ("subtrip_id") REFERENCES "subtrips"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_employeetype_id_fkey" FOREIGN KEY ("employeetype_id") REFERENCES "employeetypes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gatewaytotals" ADD CONSTRAINT "gatewaytotals_gateway_id_fkey" FOREIGN KEY ("gateway_id") REFERENCES "paymentgateways"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gatewaytotals" ADD CONSTRAINT "gatewaytotals_subtrip_id_fkey" FOREIGN KEY ("subtrip_id") REFERENCES "subtrips"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gatewaytotals" ADD CONSTRAINT "gatewaytotals_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gatewaytotals" ADD CONSTRAINT "gatewaytotals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "journeylists" ADD CONSTRAINT "journeylists_drop_location_id_fkey" FOREIGN KEY ("drop_location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "journeylists" ADD CONSTRAINT "journeylists_drop_stand_id_fkey" FOREIGN KEY ("drop_stand_id") REFERENCES "pickdrops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "journeylists" ADD CONSTRAINT "journeylists_pick_location_id_fkey" FOREIGN KEY ("pick_location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "journeylists" ADD CONSTRAINT "journeylists_pick_stand_id_fkey" FOREIGN KEY ("pick_stand_id") REFERENCES "pickdrops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "journeylists" ADD CONSTRAINT "journeylists_subtrip_id_fkey" FOREIGN KEY ("subtrip_id") REFERENCES "subtrips"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "journeylists" ADD CONSTRAINT "journeylists_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lngstngvalues" ADD CONSTRAINT "lngstngvalues_localize_id_fkey" FOREIGN KEY ("localize_id") REFERENCES "localizes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lngstngvalues" ADD CONSTRAINT "lngstngvalues_string_id_fkey" FOREIGN KEY ("string_id") REFERENCES "langstrings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "partialpaids" ADD CONSTRAINT "partialpaids_passanger_id_fkey" FOREIGN KEY ("passanger_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "partialpaids" ADD CONSTRAINT "partialpaids_subtrip_id_fkey" FOREIGN KEY ("subtrip_id") REFERENCES "subtrips"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "partialpaids" ADD CONSTRAINT "partialpaids_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payagents" ADD CONSTRAINT "payagents_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "agents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "paymethodtotals" ADD CONSTRAINT "paymethodtotals_paymethod_id_fkey" FOREIGN KEY ("paymethod_id") REFERENCES "paymethods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "paymethodtotals" ADD CONSTRAINT "paymethodtotals_subtrip_id_fkey" FOREIGN KEY ("subtrip_id") REFERENCES "subtrips"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "paymethodtotals" ADD CONSTRAINT "paymethodtotals_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "paymethodtotals" ADD CONSTRAINT "paymethodtotals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pickdrops" ADD CONSTRAINT "pickdrops_stand_id_fkey" FOREIGN KEY ("stand_id") REFERENCES "stands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pickdrops" ADD CONSTRAINT "pickdrops_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_subtrip_id_fkey" FOREIGN KEY ("subtrip_id") REFERENCES "subtrips"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "refunds" ADD CONSTRAINT "refunds_refund_by_fkey" FOREIGN KEY ("refund_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stuffassigns" ADD CONSTRAINT "stuffassigns_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stuffassigns" ADD CONSTRAINT "stuffassigns_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subtrips" ADD CONSTRAINT "subtrips_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "temporarybooks" ADD CONSTRAINT "temporarybooks_subtrip_id_fkey" FOREIGN KEY ("subtrip_id") REFERENCES "subtrips"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_bookby_user_id_fkey" FOREIGN KEY ("bookby_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_drop_location_id_fkey" FOREIGN KEY ("drop_location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_drop_stand_id_fkey" FOREIGN KEY ("drop_stand_id") REFERENCES "pickdrops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_passanger_id_fkey" FOREIGN KEY ("passanger_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_pick_location_id_fkey" FOREIGN KEY ("pick_location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_pick_stand_id_fkey" FOREIGN KEY ("pick_stand_id") REFERENCES "pickdrops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_subtrip_id_fkey" FOREIGN KEY ("subtrip_id") REFERENCES "subtrips"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_drop_location_id_fkey" FOREIGN KEY ("drop_location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_fleet_id_fkey" FOREIGN KEY ("fleet_id") REFERENCES "fleets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_pick_location_id_fkey" FOREIGN KEY ("pick_location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "schedules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_detail" ADD CONSTRAINT "user_detail_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_details" ADD CONSTRAINT "user_details_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vehicalimages" ADD CONSTRAINT "vehicalimages_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_fleet_id_fkey" FOREIGN KEY ("fleet_id") REFERENCES "fleets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
