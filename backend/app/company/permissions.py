from rest_framework import permissions

BASE_SAFE_METHODS = ['GET','HEAD','OPTIONS']
MEDIUM_SAFE_METHODS = ['GET', 'PUT','PATCH','HEAD','OPTIONS']
TOP_SAFE_METHODS = ['GET','DELETE','PUT','PATCH','HEAD','OPTIONS']

class Permission(permissions.BasePermission):
    """manage permissions based on user choice"""

    def has_object_permission(self, request, view, obj):
        print(request.method in permissions.SAFE_METHODS,'--')

        if obj.user.user_choice == "BASE":
            print('base')
            if (request.method in BASE_SAFE_METHODS
                ):
                return True
        elif obj.user.user_choice == "MEDIUM":
            print('medium')

            if (request.method in MEDIUM_SAFE_METHODS
                ):
                return True
        elif obj.user.user_choice == "TOP":
            print('Top')

            if (request.method in TOP_SAFE_METHODS
                ):
                return True
