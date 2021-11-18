from django.contrib.auth.models import Group, Permission
from django.core.management import BaseCommand


def Admin():
    admin_body, created = Group.objects.get_or_create(name="Admin_Body")
    admin_body.permissions.add(
        Permission.objects.get(codename="view_logentry"))
    admin_body.permissions.add(
        Permission.objects.get(codename="view_gate_log"))
    admin_body.permissions.add(Permission.objects.get(codename="add_parking"))
    admin_body.permissions.add(
        Permission.objects.get(codename="change_parking"))
    admin_body.permissions.add(
        Permission.objects.get(codename="delete_parking"))
    admin_body.permissions.add(Permission.objects.get(codename="view_parking"))
    admin_body.permissions.add(
        Permission.objects.get(codename="add_announcement"))
    admin_body.permissions.add(
        Permission.objects.get(codename="view_announcement"))
    admin_body.permissions.add(
        Permission.objects.get(codename="add_inventory"))
    admin_body.permissions.add(
        Permission.objects.get(codename="change_inventory"))
    admin_body.permissions.add(
        Permission.objects.get(codename="delete_inventory"))
    admin_body.permissions.add(
        Permission.objects.get(codename="view_inventory"))
    admin_body.permissions.add(
        Permission.objects.get(codename="change_maintenance"))
    admin_body.permissions.add(
        Permission.objects.get(codename="view_maintenance"))
    admin_body.permissions.add(
        Permission.objects.get(codename="view_penalty"))
    admin_body.permissions.add(
        Permission.objects.get(codename="change_penalty"))
    admin_body.permissions.add(
        Permission.objects.get(codename="change_maintenance"))
    admin_body.permissions.add(
        Permission.objects.get(codename="add_property_info"))
    admin_body.permissions.add(
        Permission.objects.get(codename="change_property_info"))
    admin_body.permissions.add(
        Permission.objects.get(codename="delete_property_info"))
    admin_body.permissions.add(
        Permission.objects.get(codename="view_property_info"))
    admin_body.permissions.add(
        Permission.objects.get(codename="add_transaction"))
    admin_body.permissions.add(
        Permission.objects.get(codename="view_transaction"))
    admin_body.permissions.add(
        Permission.objects.get(codename="add_personal_staff"))
    admin_body.permissions.add(Permission.objects.get(
        codename="change_personal_staff"))
    admin_body.permissions.add(Permission.objects.get(
        codename="delete_personal_staff"))
    admin_body.permissions.add(
        Permission.objects.get(codename="view_personal_staff"))
    admin_body.permissions.add(
        Permission.objects.get(codename="add_society_staff"))
    admin_body.permissions.add(
        Permission.objects.get(codename="change_society_staff"))
    admin_body.permissions.add(
        Permission.objects.get(codename="delete_society_staff"))
    admin_body.permissions.add(
        Permission.objects.get(codename="view_society_staff"))
    admin_body.permissions.add(Permission.objects.get(codename="add_account"))
    admin_body.permissions.add(
        Permission.objects.get(codename="change_account"))
    admin_body.permissions.add(
        Permission.objects.get(codename="delete_account"))
    admin_body.permissions.add(Permission.objects.get(codename="view_account"))
    admin_body.permissions.add(Permission.objects.get(codename="add_member"))
    admin_body.permissions.add(
        Permission.objects.get(codename="change_member"))
    admin_body.permissions.add(
        Permission.objects.get(codename="delete_member"))
    admin_body.permissions.add(Permission.objects.get(codename="view_member"))
    admin_body.permissions.add(Permission.objects.get(codename="add_question"))
    admin_body.permissions.add(
        Permission.objects.get(codename="delete_question"))
    admin_body.permissions.add(
        Permission.objects.get(codename="view_question"))
    admin_body.permissions.add(Permission.objects.get(codename="add_voting"))


def Member():
    member_body, created = Group.objects.get_or_create(name="Member_Body")
    member_body.permissions.add(
        Permission.objects.get(codename="view_parking"))
    member_body.permissions.add(
        Permission.objects.get(codename="add_announcement"))
    member_body.permissions.add(
        Permission.objects.get(codename="view_announcement"))
    member_body.permissions.add(
        Permission.objects.get(codename="view_inventory"))
    member_body.permissions.add(
        Permission.objects.get(codename="view_maintenance"))
    member_body.permissions.add(
        Permission.objects.get(codename="view_property_info"))
    member_body.permissions.add(
        Permission.objects.get(codename="view_transaction"))
    member_body.permissions.add(
        Permission.objects.get(codename="view_penalty"))
    member_body.permissions.add(
        Permission.objects.get(codename="view_personal_staff"))
    member_body.permissions.add(
        Permission.objects.get(codename="view_society_staff"))
    member_body.permissions.add(
        Permission.objects.get(codename="view_account"))
    member_body.permissions.add(Permission.objects.get(codename="view_member"))
    member_body.permissions.add(
        Permission.objects.get(codename="view_question"))
    member_body.permissions.add(Permission.objects.get(codename="add_voting"))


def Security():
    security_body, created = Group.objects.get_or_create(name="Security_Body")
    security_body.permissions.add(
        Permission.objects.get(codename="add_gate_log"))
    security_body.permissions.add(
        Permission.objects.get(codename="change_gate_log"))
    security_body.permissions.add(
        Permission.objects.get(codename="view_gate_log"))
    security_body.permissions.add(
        Permission.objects.get(codename="view_parking"))
    security_body.permissions.add(
        Permission.objects.get(codename="view_personal_staff")
    )
    security_body.permissions.add(
        Permission.objects.get(codename="view_society_staff"))
    security_body.permissions.add(
        Permission.objects.get(codename="view_member"))


class Command(BaseCommand):
    help = "This command is used to apply permissions to different groups"

    def handle(self, *args, **options):
        Admin()
        Member()
        Security()
        self.stdout.write("Admin, Member and Security Groups Created")
