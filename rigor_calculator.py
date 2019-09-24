import string, os, subprocess
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename

app = Flask(__name__)

@app.route('/text', methods=('POST'))
def text_rigor():
    return jsonify({'result': str_rigor(request.form['text'])})

@app.route('/pdf', methods=('POST'))
def pdf_rigor():
    """Return the rigor of a PDF."""
    file = request.files.get('file')
    if file and file.filename and file.filename.endswith('.pdf'):
        filename = secure_filename(file.filename)
        filepath = os.path.join('/pdfs', filename)
        file.save(filepath)
        subprocess.call(['gs', '-sDEVICE=txtwrite', '-o', 'output.txt', filepath])

        with file.open('output.txt') as f:
            text = f.read()

        return jsonify({'result': str_rigor(text)})

@app.route('/image', methods=('POST'))
def image_rigor():
    """Return the rigor of an image."""

def generate_rigor_tree(rules: dict):
    """Generate a state tree from rigor rules"""

def calculate_rigor(wordlist: list):
    """Calculate the rigor of a list of words."""
    root_state = {
        'oper': lambda cur: cur,
        'next': {
            'assume': {
                'oper': lambda cur: cur + 0.3,
                'next': {}
            },
            'suppose': {
                'oper': lambda cur: cur + 0.3,
                'next': {}
            },
            'hence': {
                'oper': lambda cur: cur + 1,
                'next': {}
            },
            'since': {
                'oper': lambda cur: cur + 1,
                'next': {}
            },
            'then': {
                'oper': lambda cur: cur + 1,
                'next': {}
            },
            'therefore': {
                'oper': lambda cur: cur + 1,
                'next': {}
            },
            'thus': {
                'oper': lambda cur: cur + 1,
                'next': {}
            },
            'it': {
                'oper': lambda cur: cur,
                'next': {
                    'follows': {
                        'oper': lambda cur: cur + 1,
                        'next': {}
                    }
                }
            },
            'without': {
                'oper': lambda cur: cur,
                'next': {
                    'loss': {
                        'oper': lambda cur: cur,
                        'next': {
                            'of': {
                                'oper': lambda cur: cur,
                                'next': {
                                    'generality': {
                                        'oper': lambda cur: cur**1.05,
                                        'next': {}
                                    }
                                }
                            }
                        }
                    }
                }
            },
            'wlog': {
                'oper': lambda cur: cur**1.05,
                'next': {}
            },
            'by': {
                'oper': lambda cur: cur,
                'next': {
                    'definition': {
                        'oper': lambda cur: cur + 2,
                        'next': {}
                    },
                    'hypothesis': {
                        'oper': lambda cur: cur + 3,
                        'next': {}
                    },
                    'the': {
                        'oper': lambda cur: cur,
                        'next': {
                            'inductive': {
                                'oper': lambda cur: cur,
                                'next': {
                                    'hypothesis': {
                                        'oper': lambda cur: cur * 1.5,
                                        'next': {}
                                    }
                                }
                            },
                            'induction': {
                                'oper': lambda cur: cur,
                                'next': {
                                    'hypothesis': {
                                        'oper': lambda cur: cur * 1.5,
                                        'next': {}
                                    }
                                }
                            }
                        }
                    },
                    'inductive': {
                        'oper': lambda cur: cur,
                        'next': {
                            'hypothesis': {
                                'oper': lambda cur: cur * 1.5,
                                'next': {}
                            }
                        }
                    },
                    'induction': {
                        'oper': lambda cur: cur,
                        'next': {
                            'hypothesis': {
                                'oper': lambda cur: cur * 1.5,
                                'next': {}
                            }
                        }
                    },
                    'symmetry': {
                        'oper': lambda cur: cur + 30,
                        'next': {}
                    }
                }
            },
            'case': {
                'oper': lambda cur: cur + 1,
                'next': {}
            },
            'claim': {
                'oper': lambda cur: cur + 5,
                'next': {}
            },
            'lemma': {
                'oper': lambda cur: cur + 10,
                'next': {}
            },
            'clearly': {
                'oper': lambda cur: cur - 11,
                'next': {}
            },
            'obviously': {
                'oper': lambda cur: cur - 22,
                'next': {}
            },
            'trivial': {
                'oper': lambda cur: cur - 33,
                'next': {}
            },
            'of': {
                'oper': lambda cur: cur,
                'next': {
                    'course': {
                        'oper': lambda cur: cur - 33,
                        'next': {}
                    }
                }
            },
            'in': {
                'oper': lambda cur: cur,
                'next': {
                    'particular': {
                        'oper': lambda cur: cur * 1.1,
                        'next': {}
                    }
                }
            },
            'qed': {
                'oper': lambda cur: cur + 50,
                'next': {}
            },
            'where': {
                'oper': lambda cur: cur - 0.5,
                'next': {}
            }
        }
    }
    state = root_state
    score = 100
    for word in wordlist:
        word = word.lower()
        state = state['next'].get(word)

        if not state:
            state = root_state['next'].get(word)

        if not state:
            state = root_state

        score = state['oper'](score)

    return score

def str_rigor(text: str):
    """Get the rigor of a string."""
    return calculate_rigor(text.translate(
        str.maketrans(string.punctuation, len(string.punctuation) * ' ')
    ).split())
