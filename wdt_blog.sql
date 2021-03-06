PGDMP                         z            wdt_blog    14.2    14.2 #               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    32933    wdt_blog    DATABASE     S   CREATE DATABASE wdt_blog WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';
    DROP DATABASE wdt_blog;
                postgres    false            ?            1259    32959    blog    TABLE       CREATE TABLE public.blog (
    blog_id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    created_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    user_id integer NOT NULL,
    category_id integer NOT NULL
);
    DROP TABLE public.blog;
       public         heap    postgres    false            ?            1259    32958    blog_blog_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.blog_blog_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.blog_blog_id_seq;
       public          postgres    false    214                        0    0    blog_blog_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.blog_blog_id_seq OWNED BY public.blog.blog_id;
          public          postgres    false    213            ?            1259    32945    category    TABLE     l   CREATE TABLE public.category (
    category_id integer NOT NULL,
    name character varying(50) NOT NULL
);
    DROP TABLE public.category;
       public         heap    postgres    false            ?            1259    32944    category_category_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.category_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.category_category_id_seq;
       public          postgres    false    212            !           0    0    category_category_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.category_category_id_seq OWNED BY public.category.category_id;
          public          postgres    false    211            ?            1259    32981    token    TABLE     ^   CREATE TABLE public.token (
    token_id integer NOT NULL,
    refresh_token text NOT NULL
);
    DROP TABLE public.token;
       public         heap    postgres    false            ?            1259    32980    token_token_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.token_token_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.token_token_id_seq;
       public          postgres    false    216            "           0    0    token_token_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.token_token_id_seq OWNED BY public.token.token_id;
          public          postgres    false    215            ?            1259    32935    user    TABLE     ?   CREATE TABLE public."user" (
    user_id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password text NOT NULL,
    created_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public."user";
       public         heap    postgres    false            ?            1259    32934    user_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public          postgres    false    210            #           0    0    user_id_seq    SEQUENCE OWNED BY     B   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".user_id;
          public          postgres    false    209            x           2604    32962    blog blog_id    DEFAULT     l   ALTER TABLE ONLY public.blog ALTER COLUMN blog_id SET DEFAULT nextval('public.blog_blog_id_seq'::regclass);
 ;   ALTER TABLE public.blog ALTER COLUMN blog_id DROP DEFAULT;
       public          postgres    false    214    213    214            w           2604    32948    category category_id    DEFAULT     |   ALTER TABLE ONLY public.category ALTER COLUMN category_id SET DEFAULT nextval('public.category_category_id_seq'::regclass);
 C   ALTER TABLE public.category ALTER COLUMN category_id DROP DEFAULT;
       public          postgres    false    211    212    212            z           2604    32984    token token_id    DEFAULT     p   ALTER TABLE ONLY public.token ALTER COLUMN token_id SET DEFAULT nextval('public.token_token_id_seq'::regclass);
 =   ALTER TABLE public.token ALTER COLUMN token_id DROP DEFAULT;
       public          postgres    false    215    216    216            u           2604    32938    user user_id    DEFAULT     i   ALTER TABLE ONLY public."user" ALTER COLUMN user_id SET DEFAULT nextval('public.user_id_seq'::regclass);
 =   ALTER TABLE public."user" ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    210    209    210                      0    32959    blog 
   TABLE DATA           ]   COPY public.blog (blog_id, title, description, created_on, user_id, category_id) FROM stdin;
    public          postgres    false    214   C%                 0    32945    category 
   TABLE DATA           5   COPY public.category (category_id, name) FROM stdin;
    public          postgres    false    212   `%                 0    32981    token 
   TABLE DATA           8   COPY public.token (token_id, refresh_token) FROM stdin;
    public          postgres    false    216   ?%                 0    32935    user 
   TABLE DATA           L   COPY public."user" (user_id, name, email, password, created_on) FROM stdin;
    public          postgres    false    210   ?(       $           0    0    blog_blog_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.blog_blog_id_seq', 1, true);
          public          postgres    false    213            %           0    0    category_category_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.category_category_id_seq', 2, true);
          public          postgres    false    211            &           0    0    token_token_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.token_token_id_seq', 14, true);
          public          postgres    false    215            '           0    0    user_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.user_id_seq', 2, true);
          public          postgres    false    209            ?           2606    32967    blog blog_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.blog
    ADD CONSTRAINT blog_pkey PRIMARY KEY (blog_id);
 8   ALTER TABLE ONLY public.blog DROP CONSTRAINT blog_pkey;
       public            postgres    false    214            ~           2606    32974    category category_id 
   CONSTRAINT     V   ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_id UNIQUE (category_id);
 >   ALTER TABLE ONLY public.category DROP CONSTRAINT category_id;
       public            postgres    false    212            ?           2606    32990    category category_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (category_id);
 @   ALTER TABLE ONLY public.category DROP CONSTRAINT category_pkey;
       public            postgres    false    212            ?           2606    32988    token token_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.token
    ADD CONSTRAINT token_pkey PRIMARY KEY (token_id);
 :   ALTER TABLE ONLY public.token DROP CONSTRAINT token_pkey;
       public            postgres    false    216            |           2606    32943    user user_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            postgres    false    210            ?           2606    32968    blog author    FK CONSTRAINT     p   ALTER TABLE ONLY public.blog
    ADD CONSTRAINT author FOREIGN KEY (user_id) REFERENCES public."user"(user_id);
 5   ALTER TABLE ONLY public.blog DROP CONSTRAINT author;
       public          postgres    false    214    210    3452            ?           2606    32975    blog category    FK CONSTRAINT     ?   ALTER TABLE ONLY public.blog
    ADD CONSTRAINT category FOREIGN KEY (category_id) REFERENCES public.category(category_id) NOT VALID;
 7   ALTER TABLE ONLY public.blog DROP CONSTRAINT category;
       public          postgres    false    3454    212    214                  x?????? ? ?            x?3?t???????????? ";?         P  x?Ŗ˒?H??ûh@
K?b%??ܓ??	?R3Q?
??􍋙E????n{????????h??mN\b?p??C`+O?U??e?D?)/?C5N?ĥ:p<:Tg??x???A`Ρ?u?S?T?2Rl??!W?????,;Չ\?q0??^??z?????s???????&??`???
^Iz??}R?l?O??{&R???F??῍p?1w??Fp<?>?????w-?TYlԙ*?pwHzr?v??84?????ڪyyS????(???siAИc??S?&-?Ў???׃??`?X?:?:g?s
??{BZ$/Ct|??!??e?3?[}̷??7P_?&8??86RȈ???%3?Ok??Z?p??{??????? ??]:?0?]?GF?fZ?įL`??{f?ZlG{??>?+?8OWn??o?7?x<v??l䙑煮?sBk,?Zcf?J??w5?	?I@o??t?'?0؊by???P??eoC?r????9$?d??b?Wl~?8??M???????cO?3???s?B ????ke?>E[C2o:#??A4&?R>???Wh???O4?l?#q??=????}Ry??wȺ??S?%??g/?u?bWq?p?????????}$F??6N?Ƥh?PE?4??Dub?^5??hIJ??I?rr???9?Eg?pe?t?_???o?=???P?;W?ƶ????0?????s??5?;<?ZEO< ?xvٲ??kOv??xrW???|?????:]qĚJ???p???9Ds?KgM?љ.?rc?kե"??Ζ?ggD???55??+?^zmm??p?/?_??I??uN_??????P??ՆZ^???|??u?????h??֚??
???a?pUS?         ?   x?e?M?0???~?ޢ9??M=?f??%??tY?aYQ?Q}?^NA??\??R?#??9֚??܍?<{?OE??kh???r"?\N?q??Z?"n 2??? =L{?:ذ?e???ak??L5?l????R?x^???#}?6~q??????dWT?.?l4vb:??O????v?o?#1?P>?
???~???     