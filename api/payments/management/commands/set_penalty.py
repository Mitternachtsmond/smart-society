from django.core.management import BaseCommand
from payments.models import Penalty


class Command(BaseCommand):
    help = "This command is used to set Penalty to 5%"

    def handle(self, *args, **options):
        Penalty.objects.create(penalty=5)
        self.stdout.write("Penalty set to 5%")
