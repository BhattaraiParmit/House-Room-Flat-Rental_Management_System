# Generated by Django 4.0.5 on 2022-08-11 04:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_alter_property_city_alter_property_province'),
    ]

    operations = [
        migrations.AlterField(
            model_name='property',
            name='balconies',
            field=models.CharField(choices=[('0', '0'), ('1', '1'), ('2', '2'), ('3', '3'), ('4', '4')], default='0', max_length=2),
        ),
        migrations.AlterField(
            model_name='property',
            name='bathroom',
            field=models.CharField(choices=[('0', '0'), ('1', '1'), ('2', '2'), ('3', '3'), ('4', '4')], default='0', max_length=2),
        ),
        migrations.AlterField(
            model_name='property',
            name='category',
            field=models.CharField(choices=[('Rent', 'Rent')], default='Rent', max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='property',
            name='city',
            field=models.CharField(choices=[('Kathmandu', 'Kathmandu'), ('Pokhara', 'Pokhara'), ('Bhaktapur', 'Bhaktapur'), ('Lalitpur', 'Lalitpur'), ('Butwal', 'Butwal'), ('Narayanghat', 'Narayanghat'), ('Hetauda', 'Hetauda'), ('Dharan', 'Dharan'), ('Illam', 'Illam'), ('Nepalghunj', 'Nepalghunj')], max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='property',
            name='province',
            field=models.CharField(choices=[('Province 1', 'Province 1'), ('Madhesh Province', 'Madhesh Province'), ('Bagmati Province', 'Bagmati Province'), ('Gandaki Province', 'Gandaki Province'), ('Lumbini Province', 'Lumbini Province'), ('Karnali Province', 'Karnali Province'), ('Sudurpashchim Province', 'Sudurpashchim Province')], max_length=50, null=True),
        ),
    ]
