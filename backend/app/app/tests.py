from django.test import TestCase

from app.calc import add

class calcTests(TestCase):

    def test_add_numbers(self):
        """test that two numbers are added """
        self.assertEqual(add(3,8), 11)
