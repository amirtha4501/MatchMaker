-- CREATE SQL QUERIES

-- Database Matrimony

CREATE DATABASE matrimony
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Table User

CREATE TABLE IF NOT EXISTS public."user"
(
    user_id integer NOT NULL DEFAULT nextval('user_user_id_seq'::regclass),
    user_name character varying COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    paid_status character varying COLLATE pg_catalog."default" NOT NULL,
    user_type character varying COLLATE pg_catalog."default" NOT NULL,
    "planPlanId" integer,
    CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY (user_id),
    CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email),
    CONSTRAINT "FK_56b1f5bc829e18743cf271f55e1" FOREIGN KEY ("planPlanId")
        REFERENCES public.plan (plan_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

-- Table Profile

CREATE TABLE IF NOT EXISTS public.profile
(
    profile_id integer NOT NULL DEFAULT nextval('profile_profile_id_seq'::regclass),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    gender character varying COLLATE pg_catalog."default" NOT NULL,
    qualification character varying COLLATE pg_catalog."default",
    job character varying COLLATE pg_catalog."default",
    religion character varying COLLATE pg_catalog."default",
    caste character varying COLLATE pg_catalog."default",
    birth_place character varying COLLATE pg_catalog."default",
    marital_status character varying COLLATE pg_catalog."default",
    height numeric,
    star character varying COLLATE pg_catalog."default",
    rasi character varying COLLATE pg_catalog."default",
    income character varying COLLATE pg_catalog."default",
    contact character varying COLLATE pg_catalog."default" NOT NULL,
    father_name character varying COLLATE pg_catalog."default",
    mother_name character varying COLLATE pg_catalog."default",
    sibiling_count character varying COLLATE pg_catalog."default",
    family_status character varying COLLATE pg_catalog."default",
    mother_tongue character varying COLLATE pg_catalog."default",
    known_language character varying COLLATE pg_catalog."default",
    expected_qualification character varying COLLATE pg_catalog."default",
    expected_place character varying COLLATE pg_catalog."default",
    expected_income character varying COLLATE pg_catalog."default",
    expected_caste character varying COLLATE pg_catalog."default",
    expected_subcaste character varying COLLATE pg_catalog."default",
    expected_marital_status character varying COLLATE pg_catalog."default",
    expected_age_difference character varying COLLATE pg_catalog."default",
    expected_height character varying COLLATE pg_catalog."default",
    expected_weight character varying COLLATE pg_catalog."default",
    img_data_1 text COLLATE pg_catalog."default",
    img_data_2 text COLLATE pg_catalog."default",
    img_data_3 text COLLATE pg_catalog."default",
    viewed_contacts integer NOT NULL DEFAULT 0,
    date_of_registration date NOT NULL DEFAULT now(),
    age integer,
    "userUserId" integer,
    birth_date timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT "PK_b0465dda30314a8786db3354a65" PRIMARY KEY (profile_id),
    CONSTRAINT "FK_c645941c0a12a9e9934026e0189" FOREIGN KEY ("userUserId")
        REFERENCES public."user" (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

-- Table Plan

CREATE TABLE IF NOT EXISTS public.plan
(
    plan_id integer NOT NULL DEFAULT nextval('plan_plan_id_seq'::regclass),
    plan_name character varying COLLATE pg_catalog."default" NOT NULL,
    currency character varying COLLATE pg_catalog."default" NOT NULL,
    price integer NOT NULL,
    description character varying COLLATE pg_catalog."default",
    billing_cycle character varying COLLATE pg_catalog."default" NOT NULL,
    created_date timestamp without time zone NOT NULL DEFAULT now(),
    updated_date timestamp without time zone NOT NULL DEFAULT now(),
    active boolean NOT NULL,
    CONSTRAINT "PK_cf8cdd9ac9fbd4f9dd000bb62ca" PRIMARY KEY (plan_id)
)

-- Table Coupon

CREATE TABLE IF NOT EXISTS public.coupon
(
    coupon_id integer NOT NULL DEFAULT nextval('coupon_coupon_id_seq'::regclass),
    coupon_code character varying COLLATE pg_catalog."default" NOT NULL,
    discount_amount integer NOT NULL,
    usage_limit integer NOT NULL,
    active boolean NOT NULL DEFAULT false,
    expiry_date timestamp without time zone NOT NULL,
    CONSTRAINT "PK_188be7cee87815a2db1a014d003" PRIMARY KEY (coupon_id),
    CONSTRAINT "UQ_8927dc8fa6af6c5182c36cb07ce" UNIQUE (coupon_code)
)

-- Table Feedback

CREATE TABLE IF NOT EXISTS public.feedback
(
    feedback_id integer NOT NULL DEFAULT nextval('feedback_feedback_id_seq'::regclass),
    subject character varying COLLATE pg_catalog."default" NOT NULL,
    comments character varying COLLATE pg_catalog."default" NOT NULL,
    rating integer NOT NULL,
    status character varying COLLATE pg_catalog."default" NOT NULL,
    feedback_type character varying COLLATE pg_catalog."default" NOT NULL,
    feedback_date timestamp without time zone NOT NULL,
    "userUserId" integer,
    CONSTRAINT "PK_05e0741767903afe9fca96d1e9d" PRIMARY KEY (feedback_id),
    CONSTRAINT "FK_f5dc2db3587c3240c921a0df566" FOREIGN KEY ("userUserId")
        REFERENCES public."user" (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

-- Table Message

CREATE TABLE IF NOT EXISTS public.message
(
    message_id integer NOT NULL DEFAULT nextval('message_message_id_seq'::regclass),
    message_text character varying COLLATE pg_catalog."default" NOT NULL,
    read_status character varying COLLATE pg_catalog."default" NOT NULL,
    "timestamp" timestamp without time zone NOT NULL DEFAULT now(),
    attachment character varying COLLATE pg_catalog."default",
    "senderUserId" integer,
    "receiverUserId" integer,
    CONSTRAINT "PK_06a563cdbd963a9f7cbcb25c447" PRIMARY KEY (message_id),
    CONSTRAINT "FK_84538395c2c056d8d2ee1fb0b4f" FOREIGN KEY ("receiverUserId")
        REFERENCES public."user" (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "FK_bd31eecc47806fe4d4f27991b76" FOREIGN KEY ("senderUserId")
        REFERENCES public."user" (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

-- Table Payment

CREATE TABLE IF NOT EXISTS public.payment
(
    payment_id integer NOT NULL DEFAULT nextval('payment_payment_id_seq'::regclass),
    amount integer NOT NULL,
    currency character varying COLLATE pg_catalog."default" NOT NULL,
    payment_gateway character varying COLLATE pg_catalog."default" NOT NULL,
    payment_method character varying COLLATE pg_catalog."default" NOT NULL,
    status character varying COLLATE pg_catalog."default" NOT NULL,
    payment_date timestamp without time zone NOT NULL DEFAULT now(),
    transaction_id character varying COLLATE pg_catalog."default" NOT NULL,
    "userUserId" integer,
    "planPlanId" integer,
    CONSTRAINT "PK_9fff60ac6ac1844ea4e0cfba67a" PRIMARY KEY (payment_id),
    CONSTRAINT "FK_3860e50cab67d6789f9ea4fd258" FOREIGN KEY ("userUserId")
        REFERENCES public."user" (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "FK_e0e4323a449fecc9f141cb02e5c" FOREIGN KEY ("planPlanId")
        REFERENCES public.plan (plan_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

-- Table Testimonial

CREATE TABLE IF NOT EXISTS public.testimonial
(
    testimonial_id integer NOT NULL DEFAULT nextval('testimonial_testimonial_id_seq'::regclass),
    testimonial_text character varying COLLATE pg_catalog."default" NOT NULL,
    approved boolean DEFAULT false,
    rating integer NOT NULL,
    relationship_length integer NOT NULL,
    submit_date timestamp without time zone NOT NULL DEFAULT now(),
    "userUserId" integer,
    CONSTRAINT "PK_6c6e32dcc53119d5a48ed2b0f43" PRIMARY KEY (testimonial_id),
    CONSTRAINT "FK_96766654dd31684e73a7fa7f7a1" FOREIGN KEY ("userUserId")
        REFERENCES public."user" (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)


-- SELECT QUERIES

SELECT * FROM public."user"
ORDER BY user_id ASC 

SELECT * FROM public.profile
ORDER BY profile_id ASC 

SELECT * FROM public.plan
ORDER BY plan_id ASC 

SELECT * FROM public.coupon
ORDER BY coupon_id ASC 

SELECT * FROM public.feedback
ORDER BY feedback_id ASC

SELECT * FROM public.message
ORDER BY message_id ASC

SELECT * FROM public.payment
ORDER BY payment_id ASC

SELECT * FROM public.testimonial
ORDER BY testimonial_id ASC


-- ALL API QUERIES

-- 1. Signup API Queries

SELECT * FROM users WHERE email = 'provided_email'; -- Checking if an email already exists

INSERT INTO users (user_name, email, password, user_type, paid_status)
VALUES ('provided_user_name', 'provided_email', 'provided_password', 'provided_user_type', 'provided_paid_status');
-- Inserting a new user