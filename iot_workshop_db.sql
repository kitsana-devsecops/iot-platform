PGDMP         5                 {            postgres    15.1    15.1                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    5    postgres    DATABASE     ?   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.874';
    DROP DATABASE postgres;
                postgres    false            	           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    3336                        3079    16384 	   adminpack 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;
    DROP EXTENSION adminpack;
                   false            
           0    0    EXTENSION adminpack    COMMENT     M   COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';
                        false    2            ?            1259    16431    component_states_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.component_states_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.component_states_id_seq;
       public          postgres    false            ?            1259    16456    component_states    TABLE     ?  CREATE TABLE public.component_states (
    id bigint DEFAULT nextval('public.component_states_id_seq'::regclass) NOT NULL,
    cid character varying NOT NULL,
    cname character varying NOT NULL,
    cvalue character varying NOT NULL,
    nodeid character varying NOT NULL,
    date_time character varying NOT NULL
);
 $   DROP TABLE public.component_states;
       public         heap    postgres    false    216            ?            1259    16419    node_sensors_id_seq    SEQUENCE     |   CREATE SEQUENCE public.node_sensors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.node_sensors_id_seq;
       public          postgres    false            ?            1259    16446    node_sensors    TABLE     ?  CREATE TABLE public.node_sensors (
    id bigint DEFAULT nextval('public.node_sensors_id_seq'::regclass) NOT NULL,
    node_id character varying NOT NULL,
    node_name character varying NOT NULL,
    memory_size character varying NOT NULL,
    sensor_id character varying NOT NULL,
    sensor_name character varying NOT NULL,
    sensor_value character varying NOT NULL,
    date_time timestamp with time zone NOT NULL
);
     DROP TABLE public.node_sensors;
       public         heap    postgres    false    215                      0    16456    component_states 
   TABLE DATA           U   COPY public.component_states (id, cid, cname, cvalue, nodeid, date_time) FROM stdin;
    public          postgres    false    218   ?                 0    16446    node_sensors 
   TABLE DATA           |   COPY public.node_sensors (id, node_id, node_name, memory_size, sensor_id, sensor_name, sensor_value, date_time) FROM stdin;
    public          postgres    false    217   o                  0    0    component_states_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.component_states_id_seq', 11, true);
          public          postgres    false    216                       0    0    node_sensors_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.node_sensors_id_seq', 6, true);
          public          postgres    false    215            p           2606    16463 &   component_states component_states_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.component_states
    ADD CONSTRAINT component_states_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.component_states DROP CONSTRAINT component_states_pkey;
       public            postgres    false    218            n           2606    16455    node_sensors node_sensors_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.node_sensors
    ADD CONSTRAINT node_sensors_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.node_sensors DROP CONSTRAINT node_sensors_pkey;
       public            postgres    false    217               ?   x?u?+?0EQ????h??qv?²?4R??Z&?>һy???{????ǹ??N?#ˌ4?0?E?D??'oJ???2tE?UES?](璍?*MqW|??<4?"???e??*?????9??@??)??Lt         ?   x?}ϻ?0?????8n??0???H?J}??-j$V[????????,?(??5??i??(?Sv%RIX?&G?G??E?????W;??3??1'R?ц%?????^ز?h????W?????6"??u???LP?ť??a??e'\?$????5?| *BK?     