from django.apps import AppConfig


class SocietyInfoConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "society_info"

    def ready(self):
        import society_info.signals
